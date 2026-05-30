dotenv.config();
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./auth/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import { Server } from "socket.io";
import authenticateSocket from "./middlewares/authentication.js";
import { incrementActiveUsers } from "./middlewares/activeUsers.js";

const app = express();
const server = http.createServer(app);

// express cors 
app.use(
  cors({
    origin: process.env.FRONTEND || "http://localhost:5173",
  }),
);

// socket cors 
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND || "http://localhost:5173",
    credentials: true,
  },
});

// socket middlewares
io.use(authenticateSocket)
io.use(incrementActiveUsers)

// express middlewares
app.set("io", io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to Kurakani API!");
});

app.use("/api/v1", authRouter);

app.use(errorHandler);

export { server, io };
