import type { NextFunction, Request, Response } from "express";
import {
  BadRequestError,
  UnprocessableEntityError,
} from "../errors/customErrors.js";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function loginValidator(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  if (!body) {
    throw new BadRequestError("Request body is required");
  }

  const { email, password } = body;

  if (!email) {
    throw new UnprocessableEntityError("Email is required");
  }

  if (email && !emailRegex.test(email)) {
    throw new UnprocessableEntityError("Invalid Email address");
  }

  if (!password) {
    throw new UnprocessableEntityError("Password is required");
  }

  if (password && password.length < 6) {
    throw new UnprocessableEntityError(
      "Password length must be greater than 6 chars.",
    );
  }

  next();
}

function signupValidator(req: Request, res: Response, next: NextFunction) {
  const body = req.body;

  if (!body) {
    throw new BadRequestError("Request body is required");
  }

  const { email, username, password } = body;

  if (!email) {
    throw new UnprocessableEntityError("Email is required");
  }

  if (email && !emailRegex.test(email)) {
    throw new UnprocessableEntityError("Invalid Email address");
  }

  if (!password) {
    throw new UnprocessableEntityError("Password is required");
  }

  if (password && password.length < 6) {
    throw new UnprocessableEntityError(
      "Password length must be greater than 6 chars.",
    );
  }

  if(!username) {
    throw new UnprocessableEntityError("Username is required");
  }

  if (username && username.length < 2) {
    throw new UnprocessableEntityError(
      "Username must be of at least 2 chars.",
    );
  }

  next();
}

export { loginValidator, signupValidator };
