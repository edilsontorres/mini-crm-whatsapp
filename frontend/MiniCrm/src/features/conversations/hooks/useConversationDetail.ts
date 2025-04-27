import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DefaultConection } from "../../../api/axios";
import { Conversation, Message } from "../types/conversationsTypes";
import { usePolling } from "./usePolling";

export const useConversationDetail = (conversationIdParam?: string) => {
    const { conversationId: routeConversationId } = useParams<{ conversationId: string }>();
    const conversationId = conversationIdParam || routeConversationId;
    
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        if (!conversationId) return;
        
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
    };

    const fetchMessages = useCallback(async () => {
        if (!conversationId) return;
        try {
            const response = await DefaultConection().get<Message[]>(`message/conversation/${conversationId}`);
            const newMessages = response.data;

            const lastNewId = newMessages[newMessages.length - 1]?.id;
            const lastCurrentId = messages[messages.length - 1]?.id;

            if (lastNewId !== lastCurrentId) {
                setMessages(newMessages);
            }

        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
        }
    }, [conversationId, messages]);

    usePolling(fetchMessages, 3000);

    useEffect(() => {
        fetchData();
    }, [conversationId]);

    return { conversation, messages, loading, fetchData }
}