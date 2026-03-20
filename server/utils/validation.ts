import { prisma } from "../../lib/prisma";
import AppError from "../errors/AppError";

export const validateUsername = (username: string) => {
  if (username.length < 3) {
    throw new AppError("Username must be at least 3 characters.", 400);
  }
  if (username.length > 30) {
    throw new AppError("Username must be under 30 characters.", 400);
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new AppError("Username can only contain letters, numbers, and underscores.", 400);
  }
};

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    throw new AppError("Password must be at least 8 characters long.", 400);
  }
  if (!/[a-zA-Z]/.test(password)) {
    throw new AppError("Password must contain at least one letter.", 400);
  }

  if (!/[0-9]/.test(password)) {
    throw new AppError("Password must contain at least one digit.", 400);
  }

  return true;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length > 254) {
    throw new AppError("Email address is too long.", 400); // 254 is the RFC standard max
  }
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format.", 400);
  }
};

export const validateUserInput = (username: string, password: string, email: string) => {
  if (!username || !password || !email) {
    throw new AppError("Please fill out all fields.", 400);
  }

  validateUsername(username);
  validateEmail(email);
  validatePassword(password);
};

export const validateUniqueUser = async (username: string, email: string) => {
  const [existingUsername, existingEmail] = await Promise.all([
    prisma.user.findUnique({ where: { username } }),
    prisma.user.findUnique({ where: { email } }),
  ]);

  if (existingUsername) {
    throw new AppError("Username already taken.", 409);
  }
  if (existingEmail) {
    throw new AppError("Email already registered.", 409);
  }
};