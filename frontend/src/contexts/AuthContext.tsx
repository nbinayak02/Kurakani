import { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => boolean;
    logout: () => boolean;
    token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

    const login = (token: string) => {
        setToken(token);
        localStorage.setItem("authToken", token);
        return true;
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("authToken");
        return true;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };