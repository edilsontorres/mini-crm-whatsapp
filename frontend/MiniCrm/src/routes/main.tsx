import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatWorkspace } from '../features/conversations/pages/ChatWorkspace';
import { Login } from "../features/screenLogin/pages/screenLogin";

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/chat" element={<ChatWorkspace />} />
            </Routes>
        </BrowserRouter>
    )
}