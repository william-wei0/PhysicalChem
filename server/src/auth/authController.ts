import { Request, Response, NextFunction } from "express";
import * as authService from "./authService";
import { verifyRefreshToken, generateAccessToken } from "../utils/tokens";
import AppError from "../errors/AppError";
import { validatePassword } from "@/utils/userValidation";

export const loginUser = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      throw new AppError("Please fill in all fields.", 400);
    }

    const { accessToken, refreshToken, user } = await authService.loginUser(email, password);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) throw new AppError("No refresh token.", 401);

    verifyRefreshToken(token);

    const { accessToken, refreshToken: newRefreshToken } = await authService.rotateRefreshToken(token);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Token refreshed." });
  } catch {
    next(new AppError("Invalid or expired refresh token.", 401));
  }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) await authService.logoutUser(token);
  } finally {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ message: "Logged out." });
  }
};

export const forgotPassword = async (req: Request<{}, {}, { email: string }>, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      throw new AppError("Email is required.", 400);
    }

    await authService.requestPasswordReset(email);

    return res.status(200).json({
      message: "If that email exists you will receive a reset link shortly.",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request<{}, {}, { token: string; password: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      throw new AppError("Token and password are required.", 400);
    }

    validatePassword(password);

    await authService.resetPassword(token, password);

    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    next(error);
  }
};
