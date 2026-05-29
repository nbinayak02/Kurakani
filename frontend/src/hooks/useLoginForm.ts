import { useState, type SubmitEvent } from "react";
import type { LoginError } from "../types/auth";
import validateLoginForm from "../utils/validateLoginForm";
import usePost from "./usePost";

const useLoginForm = () => {
  const [errors, setErrors] = useState<LoginError>({});
  const [pending, setPending] = useState(false);
  const { postData } = usePost();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const errors = validateLoginForm(email, password);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setPending(false);
      return false;
    }

    // call api
    const response = await postData("/api/auth/login", {
      email,
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

export default useLoginForm;
