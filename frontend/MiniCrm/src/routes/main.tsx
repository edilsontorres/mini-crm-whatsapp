import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WaitingPanel } from "../features/conversations/pages/WaitingPanel";
import { ConversationDetail } from '../features/conversations/pages/ConversationDetail';

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/waiting-panel" element={<WaitingPanel />} />
                <Route  path="/conversation/:conversationId" element={<ConversationDetail />} />
            </Routes>
        </BrowserRouter>
    )
}