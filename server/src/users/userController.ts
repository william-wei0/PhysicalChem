import { Request, Response, NextFunction } from "express";
import * as userService from "./userService";
import { validateUserInput, validateUniqueUser } from "../utils/userValidation";
import AppError from "../errors/AppError";

export const createUser = async (
  req: Request<{}, {}, { username: string; password: string; email: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      throw new AppError("Username, password, and email are required.", 400);
    }

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    validateUserInput(trimmedUsername, trimmedPassword, trimmedEmail);
    await validateUniqueUser(trimmedUsername, trimmedEmail);

    const user = await userService.createUser({
      username: trimmedUsername,
      password: trimmedPassword,
      email: trimmedEmail,
    });

    return res.status(201).json({ message: "User successfully created.", user });
  } catch (error) {
    next(error);
  }
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "this is the users Page" });
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
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
