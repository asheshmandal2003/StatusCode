import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "../config/cors";
import authRouter from "../routes/auth";
import profileRouter from "../routes/profile";
import userRouter from "../routes/message";

if (process.env.NODE !== "PRODUCTION") {
  dotenv.config();
}

export const app: Application = express();

app.use(cors(corsConfig));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", profileRouter);
app.use("/api/v1/user", userRouter);

app.use("*", (_req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "Page not found!",
  });
});
