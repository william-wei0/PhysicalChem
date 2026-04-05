import { Router } from "express";
import { loginUser, refreshToken, logoutUser } from "./authController";
import { getMe } from "@/users/userController";
import { authenticate } from "./authenticate";
import rateLimit from "express-rate-limit";
import { forgotPassword } from "./authController";
import { resetPassword } from "./authController";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many signup attempts, please try again later." },
});

const authRouter = Router();

authRouter.post("/login", loginLimiter, loginUser);
authRouter.post("/refresh", refreshToken);
authRouter.post("/logout", logoutUser);

authRouter.get("/me", authenticate, getMe);


const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,                     
  message: { error: "Too many reset attempts, please try again later." }
});

authRouter.post("/forgot-password", resetLimiter, forgotPassword);
authRouter.post("/reset-password", resetLimiter, resetPassword);

export default authRouter;