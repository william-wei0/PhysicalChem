import bcrypt from "bcrypt";
import { prisma, withAdminContext } from "../lib/prisma";
import crypto from "crypto";
import AppError from "../errors/AppError";
import { getUserByEmail } from "../users/userService";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens";
import { sendPasswordResetEmail } from "../utils/email";

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AppError("Invalid email or password.", 401);
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await withAdminContext((client) =>
    client.loginSession.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    }),
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  };
};

export const rotateRefreshToken = async (oldToken: string) => {
  return withAdminContext(async (client) => {
    const session = await client.loginSession.findUnique({
      where: { refreshToken: oldToken },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        await client.loginSession.delete({ where: { id: session.id } });
      }
      throw new AppError("Invalid or expired refresh token.", 401);
    }

    const accessToken = generateAccessToken(session.userId);
    const newRefreshToken = generateRefreshToken(session.userId);

    await client.loginSession.update({
      where: { id: session.id },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken: newRefreshToken };
  });
};

export const logoutUser = async (refreshToken: string) => {
  await withAdminContext((client) => client.loginSession.deleteMany({ where: { refreshToken } }));
};

export const requestPasswordReset = async (email: string) => {
  await withAdminContext(async (client) => {
    const user = await client.users.findUnique({ where: { email } });

    if (!user) return;

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await client.users.update({
      where: { email },
      data: {
        resetPasswordToken: token,
        resetPasswordExpires: expires,
      },
    });

    await sendPasswordResetEmail(email, token);
  });
};

export const resetPassword = async (token: string, newPassword: string) => {
  await withAdminContext(async (client) => {
    const user = await client.users.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new AppError("Invalid or expired reset token.", 400);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await client.$transaction(async (tx) => {
      await tx.users.update({
        where: { id: user.id },
        data: {
          passwordHash,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      });

      await tx.loginSession.deleteMany({
        where: { userId: user.id },
      });
    });
  });
};
