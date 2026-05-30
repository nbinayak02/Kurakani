import express from "express";
import { loginValidator, signupValidator } from "../../middlewares/validation.js";
import { login, signup } from "./user.controller.js";
import asyncErrorHandler from "../../utils/asyncErrorHandler.js";

const router = express.Router();

router.post("/signup", signupValidator, asyncErrorHandler(signup));
router.post("/login", loginValidator, asyncErrorHandler(login));

export default router;
