import type { Request, Response } from "express";
import {
  UnknownError,
  UnprocessableEntityError,
} from "../errors/customErrors.js";
import User, { type TUser } from "./auth.model.js";
import { comparePassword, hashPassword } from "../utils/encrypt.js";
import type { ApiResponse } from "../types/types.js";
import { getAccessToken } from "../utils/jwt.js";

async function signup(
  req: Request,
  res: Response<ApiResponse<Omit<TUser, "password">>>,
) {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new UnprocessableEntityError(
        "Email already in use. Please use a different email.",
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.log("Error in signup:", error);
    throw new UnknownError("An unknown error occurred during signup");
  }
}

async function login(
  req: Request,
  res: Response<ApiResponse<{ token: string }>>,
) {
  // try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnprocessableEntityError(
        "User not found with the provided email. Please sign up first.",
      );
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnprocessableEntityError(
        "Incorrect password. Please try again.",
      );
    }

    const token = getAccessToken({
      email: user.email,
      username: user.username,
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: {
        token,
      },
    });
  // } catch (error) {
  //   console.log("Error in login:", error);
  //   throw new UnknownError("An unknown error occurred during login");
  // }
}

export { signup, login };