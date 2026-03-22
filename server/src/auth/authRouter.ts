import { Router } from "express";
import { loginUser, refreshToken, logoutUser } from "./authController";
import { getMe } from "@/users/userController";
import { authenticate } from "./authenticate";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many signup attempts, please try again later." },
});

const loginRouter = Router();


loginRouter.post("/login", loginLimiter, loginUser);
loginRouter.post("/refresh", refreshToken);
loginRouter.post("/logout", logoutUser);

loginRouter.get("/me", authenticate, getMe);

export default loginRouter;