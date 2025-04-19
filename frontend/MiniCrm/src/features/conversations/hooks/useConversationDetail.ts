import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { DefaultConection } from "../../../api/axios";

interface Message {
    id: number;
    content: string;
    sentAt: string;
    isFromClient: boolean;
}

export function useConversationDetail() {
    const { conversationId } = useParams<{ conversationId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const conversation = location.state?.conversation;

    useEffect(() => {
        console.log("conversationId da URL:", conversationId);
        console.log("conversation via state:", conversation);
        if (!conversationId) return;

        async function fetchConversationDetail() {
            try {
                setLoading(true);

                const messagesRes = await DefaultConection().get<Message[]>(`message/conversation/${conversationId}`);
                setMessages(messagesRes.data);

            } catch (err) {
                console.error("Erro ao buscar conversa ou mensagens:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchConversationDetail();
    }, [conversationId]);

    return { conversation, messages, loading };
}
