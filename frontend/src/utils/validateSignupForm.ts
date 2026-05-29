import type { SignupError } from "../types/auth";

const validateSignupForm = (
  email: string,
  username: string,
  password: string,
): SignupError => {
  const errors: SignupError = {};
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!username) {
    errors.username = "Username is required";
  }
  if (!password) {
    errors.password = "Password is required";
  }

  if (!email) {
    errors.email = "Email is required";
  }

  if (username && username.length < 2) {
    errors.username = "Username must be of at least 2 chars.";
  }

  if (password && password.length < 6) {
    errors.password = "Password length must be greater than 6 chars.";
  }

  if (email && !emailRegex.test(email)) {
    errors.email = "Email is not valid";
  }

  return errors;
};

export default validateSignupForm;
