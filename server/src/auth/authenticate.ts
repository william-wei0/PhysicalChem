import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/tokens";
import AppError from "../errors/AppError";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(new AppError("No token provided.", 401));
  }

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch {
    return next(new AppError("Invalid or expired token.", 401));
  }
};