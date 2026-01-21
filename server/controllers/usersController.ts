import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const getUsers = async (_req: Request, _res: Response) => {
  const allUsers = await prisma.user.findMany({
    select: {
      username: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
};

export const createUser = async (
  req: Request<{}, {}, { username: string; password: string; email: string }>,
  res: Response
) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "username and password are required" });
  }

  const existingUser = await prisma.user.findUnique({
    where: { username: username },
  });

  if (existingUser) {
    return res.status(409).json({ error: "username already taken" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username: username,
      passwordHash: passwordHash,
      email: "email@",
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
    },
  });
  return res.status(201).json({
    message: "User created",
    user,
  });
};
