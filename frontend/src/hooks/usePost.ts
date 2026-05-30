type PostDataReturn = {
  success: boolean;
  data?: unknown;
  error?: string;
};

const usePost = () => {
  const host =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/v1";

  const postData = async (
    path: string,
    data: unknown,
  ): Promise<PostDataReturn> => {
    try {
      const url = `${host}${path}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!response.ok) {
        // console.log("The response is ", res.error.message)
        return {success: false, error: res.error.message || "Something went wrong" };
      }

      return { success: res.success, data: res?.data };
    } catch (error: unknown) {
      console.log(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Something went wrong",
      };
    }
  };

  return { postData };
};

export default usePost;
