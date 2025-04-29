import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatWorkspace } from '../features/conversations/pages/ChatWorkspace';

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chat" element={<ChatWorkspace />} />
            </Routes>
        </BrowserRouter>
    )
}