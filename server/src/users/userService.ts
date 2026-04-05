import bcrypt from "bcrypt";
import { prisma, withUserContext, withAdminContext  } from "../lib/prisma";
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

export const createUser = async ({ username, password, email }: CreateUserInput) => {
  const passwordHash = await bcrypt.hash(password, 10);

  return withAdminContext((client) =>
    client.users.create({
      data: { username, passwordHash, email },
      select: { id: true, username: true, createdAt: true },
    })
  );
};

export const getUserById = async (userId: number) => {
  const user = await withUserContext(userId, (tx) =>
    tx.users.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true, createdAt: true },
    })
  );

  if (!user) throw new AppError("User not found.", 404);
  return user;
};


export const getUserByEmail = async (email: string) => {
  return withAdminContext((client) =>
    client.users.findUnique({ where: { email } })
  );
};

export const getUserByUsername = async (username: string) => {
  return withAdminContext((client) =>
    client.users.findUnique({ where: { username } })
  );
};


export const updateUserEmail = async (requestingUserId: number, newEmail: string) => {
  return withUserContext(requestingUserId, (tx) =>
    tx.users.update({
      where: { id: requestingUserId },
      data: { email: newEmail },
      select: { id: true, username: true, email: true },
    })
  );
};