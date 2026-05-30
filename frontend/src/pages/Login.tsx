import { Loader2, MessagesSquare } from "lucide-react";
import useLoginForm from "../hooks/useLoginForm";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

    const { handleSubmit, errors, isPending, isSuccess, data } = useLoginForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        if (isSuccess && data) {
            console.log("Response data:", data);
            login(data);
            navigate("/");
        }
    }, [isSuccess, data, navigate, login]);

    return <>
        <div className="w-full h-screen flex items-center justify-center">
            {/* container  */}
            <div className="w-md h-xl bg-primary border-2 border-primary rounded-xl p-4 shadow-glass">

                <div className="w-full flex flex-col gap-3 items-center justify-center">
                    <div className="border-2 border-primary rounded-full p-4">
                        <MessagesSquare />
                    </div>
                    <h1 className="text-2xl font-medium">Kurakani</h1>
                </div>

                <div className="flex flex-col gap-4 mt-6 px-4 mb-4">
                    {errors.otherError && <p className="text-red-500 text-sm mt-1">{errors.otherError}</p>}

                    <h2 className="text-xl font-semibold">Login</h2>
                    <form onSubmit={handleSubmit} >

                        <input name="email" type="text" placeholder="Email" className="w-full bg-transparent border-2 border-primary rounded-lg p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-primary" />

                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                        <input name="password" type="password" placeholder="Password" className="w-full bg-transparent border-2 border-primary rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-primary" />

                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

                        <button type="submit" disabled={isPending} className="w-full flex flex-row justify-center btn-glass p-2 rounded-lg mt-4">
                            {isPending ?
                                <Loader2 className="animate-spin" />
                                : "Login"}

                        </button>

                        <p className="text-center font-light text-sm text-muted mt-2">New to Kurakani?
                            <Link to={"/signup"} className="text-purple-400 ml-2 cursor-pointer">Sign Up</Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    </>;
}

export default Login;