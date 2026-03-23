import bcrypt from "bcrypt";
import {prisma} from "../lib/prisma"
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
        gt: new Date()
      },
    },
  });

  if (!user) {
    throw new AppError("Invalid or expired reset token.", 400);
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);

  await prisma.users.update({
    where: { id: user.id },
    data: {
      passwordHash,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });
};