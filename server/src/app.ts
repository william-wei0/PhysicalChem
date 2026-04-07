import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./users/userRouter";
import authRouter from "./auth/authRouter"
import AppError from "./errors/AppError";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import lessonRoutes from "./lessons/lessonRouter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.onrender.com",
];


const app = express();
app.set("trust proxy", 1);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-csrf-token"],
}));


app.use(express.json())
app.use(cookieParser());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/lessonProgress", lessonRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/*path', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.use((_req: Request, res: Response) => {
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