import { createContext, useState, type ReactNode } from "react";

type Data = {
    token: string;
    username: string;
    id: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (data: Data) => boolean;
    logout: () => boolean;
    user: Data | null;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [userData, setUserData] = useState<Data | null>(() => {
        const data = localStorage.getItem("userData")
        return data ? JSON.parse(data) : null
    })

    const login = (data: Data) => {
        setUserData(data);
        localStorage.setItem("userData", JSON.stringify(data));
        return true;
    };

    const logout = () => {
        setUserData(null);
        localStorage.removeItem("userData");
        return true;
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!userData, login, logout, user: userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };