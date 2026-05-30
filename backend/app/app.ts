dotenv.config();
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./auth/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND || "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Kurakani API!");
});

app.use("/api/v1", authRouter);

app.use(errorHandler);

export default app;
