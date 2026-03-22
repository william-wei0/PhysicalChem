// server/src/controllers/userController.ts
import { Request, Response, NextFunction } from "express";
import * as userService from "./userService";
import { validateUserInput, validateUniqueUser } from "./userValidation";
import AppError from "../errors/AppError";

export const createUser = async (
  req: Request<{}, {}, { username: string; password: string; email: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    validateUserInput(username, password, email);
    await validateUniqueUser(username, email);

    const user = await userService.createUser({ username, password, email });

    return res.status(201).json({
      message: "User successfully created.",
      user,
    });

  } catch (error) {
    next(error);
  }
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({message: "this is the users Page"})
}

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      throw new AppError("Not authenticated.", 401);
    }

    const user = await userService.getUserById(req.userId);

    return res.status(200).json({ user });

  } catch (error) {
    next(error);
  }
};

