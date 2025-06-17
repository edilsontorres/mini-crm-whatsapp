import { createContext, ReactNode, useContext, useState } from "react";
import { DefaultConection } from "../../../api/axios";

interface AuthContextType {
    token: string | any
    login: (email: string, password: string) => Promise<void>
    //logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = async (email: string, password: string) => {

        const response = await DefaultConection().post("/auth/login", { email, password });
        const resToken = response.data.token;

        if (resToken) {
            localStorage.setItem("token", resToken);
            setToken(resToken);
        }

    }

    return (
        <AuthContext.Provider value={{ token, login }}>
            {children}
        </AuthContext.Provider>
    )

}