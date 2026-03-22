// server/src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import * as authService from "./authService";
import { verifyRefreshToken, generateAccessToken } from "../utils/tokens";
import AppError from "../errors/AppError";

export const loginUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!email || !password) {
      throw new AppError("Please fill in all fields.", 400);
    }

    const { accessToken, refreshToken, user } = await authService.loginUser(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken, user });

  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new AppError("No refresh token.", 401);
    }

    const payload = verifyRefreshToken(token);
    const accessToken = generateAccessToken(payload.userId);

    return res.status(200).json({ accessToken });

  } catch {
    throw new AppError("Invalid or expired refresh token.", 401);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logged out." });
};