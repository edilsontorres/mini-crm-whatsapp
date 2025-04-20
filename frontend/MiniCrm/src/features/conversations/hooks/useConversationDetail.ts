import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultConection } from "../../../api/axios";
import { Conversation, Message } from "../types/conversationsTypes";

export const useConversationDetail = () =>  {
    const { conversationId } = useParams<{ conversationId: string }>();
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!conversationId) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                const [convRes, messagesRes] = await Promise.all([
                    DefaultConection().get<Conversation>(`conversation/${conversationId}`),
                    DefaultConection().get<Message[]>(`message/conversation/${conversationId}`)
                ]);

                setConversation(convRes.data);
                setMessages(messagesRes.data);

            } catch (err) {
                console.error("Erro ao buscar conversa ou mensagens:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [conversationId]);

    return { conversation, messages, loading };
}