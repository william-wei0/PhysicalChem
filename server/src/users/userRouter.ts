import { Router } from "express";
import { createUser, getUsers } from "./userController";
import rateLimit from "express-rate-limit";

const userSignupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many signup attempts, please try again later." },
});

const userRouter = Router();

userRouter.get("/", userSignupLimiter, (req, res)=>{ return res.status(500).json({ error: "Internal server error." })});
userRouter.get("/signup", userSignupLimiter, getUsers);
userRouter.post("/signup", userSignupLimiter, createUser);

export default userRouter;
