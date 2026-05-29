import type { LoginError } from "../types/auth";

const validateLoginForm = (
    email: string,
    password: string,
  ): LoginError => {
    const errors: LoginError = {};
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    }

    if (email && !emailRegex.test(email)) {
      errors.email = "Invalid Email address";
    }

    if (password && password.length < 6) {
      errors.password = "Password length must be greater than 6 chars.";
    }

    return errors;
  };

  export default validateLoginForm;