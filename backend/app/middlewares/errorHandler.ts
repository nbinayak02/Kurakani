import type { NextFunction, Request, Response } from "express";
import type AppError from "../errors/appError.js";

function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // console.log(err);

  const statusCode = err.statusCode || 500;

  const errorResponse = {
    error: {
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
      errorInfo: err.errors || undefined,
    },
  };

  res.status(statusCode).json(errorResponse);
  next();
}

export default errorHandler;