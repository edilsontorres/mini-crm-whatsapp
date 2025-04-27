import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WaitingPanel } from "../features/conversations/components/WaitingPanel";
import { ConversationDetail } from '../features/conversations/components/ConversationDetail';
import { ChatWorkspace } from '../features/conversations/pages/ChatWorkspace';

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/waiting-panel" element={<WaitingPanel />} />
                <Route path="/conversation/:conversationId" element={<ConversationDetail />} />
                <Route path="/chat" element={<ChatWorkspace />} />
            </Routes>
        </BrowserRouter>
    )
}