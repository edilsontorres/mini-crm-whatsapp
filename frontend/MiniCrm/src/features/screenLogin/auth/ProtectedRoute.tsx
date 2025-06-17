import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"


export const ProtectedRoute = () => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />
}