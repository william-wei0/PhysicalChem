import { Router } from "express";
import { createUser } from "../controllers/userController";
import rateLimit from "express-rate-limit";

const userSignupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many signup attempts, please try again later." },
});

const userRouter = Router();

userRouter.post("/signup", userSignupLimiter, createUser);

export default userRouter;
