import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import AppError from "../errors/AppError";

type CreateUserInput = {
  username: string;
  password: string;
  email: string;
};

type UserResponse = {
  id: number;
  username: string;
  createdAt: Date;
};

export const createUser = async ({
  username,
  password,
  email,
}: CreateUserInput): Promise<UserResponse> => {
  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.users.create({
    data: { username, passwordHash, email },
    select: { id: true, username: true, createdAt: true },
  });
};

export const getUserById = async (id: number) => {
  const user = await prisma.users.findUnique({
    where: { id },
    select: { id: true, username: true, email: true, createdAt: true },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  return user;
};

export const getUserByEmail = async (email: string) => {
  return prisma.users.findUnique({
    where: { email },
  });
};

export const getUserByUsername = async (username: string) => {
  return prisma.users.findUnique({
    where: { username },
  });
};