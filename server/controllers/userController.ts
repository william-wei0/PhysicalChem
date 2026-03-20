import { prisma } from "../../lib/prisma";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { validateUserInput, validateUniqueUser } from "../utils/validation";


export const createUser = async (
  req: Request<{}, {}, { username: string; password: string; email: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    validateUserInput(username, password, email);
    await validateUniqueUser(username, email);

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, passwordHash, email },
      select: { id: true, username: true, createdAt: true },
    });

    return res.status(201).json({ message: "User successfully created.", user });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (_req: Request, _res: Response) => {
  const allUsers = await prisma.user.findMany({
    select: {
      username: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
};
