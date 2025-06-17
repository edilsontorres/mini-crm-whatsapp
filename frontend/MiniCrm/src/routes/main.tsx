import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatWorkspace } from '../features/conversations/pages/ChatWorkspace';
import { Login } from "../features/screenLogin/pages/screenLogin";
import { AuthProvider } from "../features/screenLogin/auth/AuthContext";
import { ProtectedRoute } from "../features/screenLogin/auth/ProtectedRoute";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/chat" element={<ChatWorkspace />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}