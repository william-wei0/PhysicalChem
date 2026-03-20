import express from "express";
import userRouter from "./routes/userRouter";
import AppError from "./errors/AppError";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json())
app.use("/api/users", userRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error({
    message: err.message,
    path: req.path,
    method: req.method,
    stack: err.stack,
    timestamp: new Date().toISOString(),
  });

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal server error." });
});

export default app;