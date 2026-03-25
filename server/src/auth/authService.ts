import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
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

  await prisma.loginSession.create({
    data: {
      userId: user.id,
      refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

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
  const session = await prisma.loginSession.findUnique({
    where: { refreshToken: oldToken },
  });

  if (!session || session.expiresAt < new Date()) {
    // if expired, delete it
    if (session) await prisma.loginSession.delete({ where: { id: session.id } });
    throw new AppError("Invalid or expired refresh token.", 401);
  }

  const accessToken = generateAccessToken(session.userId);
  const newRefreshToken = generateRefreshToken(session.userId);

  // swap old token for new one atomically
  await prisma.loginSession.update({
    where: { id: session.id },
    data: {
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken: newRefreshToken };
};


export const logoutUser = async (refreshToken: string) => {
  await prisma.loginSession.deleteMany({ where: { refreshToken } });
};

export const requestPasswordReset = async (email: string) => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) return;

  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.users.update({
    where: { email },
    data: {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    },
  });

  await sendPasswordResetEmail(email, token);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const user = await prisma.users.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new AppError("Invalid or expired reset token.", 400);
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.$transaction([
    prisma.users.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    }),
    prisma.loginSession.deleteMany({
      where: { userId: user.id },
    }),
  ]);
};
