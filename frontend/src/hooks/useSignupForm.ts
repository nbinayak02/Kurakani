import { useState, type SubmitEvent } from "react";
import type { SignupError } from "../types/auth";
import validateSignupForm from "../utils/validateSignupForm";
import usePost from "./usePost";

const useSignupForm = () => {
  const [errors, setErrors] = useState<SignupError>({});
  const [pending, setPending] = useState(false);
  const { postData } = usePost();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const errors = validateSignupForm(email, username, password);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setPending(false);
      return false;
    }

    const response = await postData("/api/auth/signup", {
      email,
      username,
      password,
    });

    if (!response.success && response.error) {
      setErrors({ otherError: response.error });
      setPending(false);
      return false;
    }
    setPending(false);
    return true;
  };

  return { handleSubmit, errors, isPending: pending };
};

export default useSignupForm;
