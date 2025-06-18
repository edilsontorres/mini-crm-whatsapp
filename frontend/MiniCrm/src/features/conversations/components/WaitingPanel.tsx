import { useEffect, useState } from "react";
import { DefaultConection } from "../../../api/axios";
import { WaitingConversationDto } from "../types/conversationsTypes";
import { usePolling } from "../hooks/usePolling";
import { DateTime } from "luxon";
import { useAuth } from "../../screenLogin/auth/AuthContext";
import { getUserId } from "../../../api/conversationApi";

export const WaitingPanel = ({ onCapture }: { onCapture: (conversationId: number) => void }) => {
    const [conversations, setConversations] = useState<WaitingConversationDto[]>([]);
    const [userId, setUserId] = useState<any>();
    const { token } = useAuth();

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await getUserId(token);
            setUserId(id);
        }

        fetchUserId();
    }, [token]);

    const getConversations = async () => {
        try {
            const response = await DefaultConection().get('/conversation/waiting');
            setConversations(response.data);
        } catch (error) {
            console.error("Erro ao buscar as conversas: ", error);
        }
    }

    const handleCaptureConversation = async (conversationId: number) => {
        const data = {
            userId: userId
        }

        try {
            await DefaultConection().put(`conversation/${conversationId}/assing`, data);
            onCapture(conversationId);
            getConversations();
        } catch (error) {
            console.error("Erro ao capturar a conversa: ", error);
        }
    }

    useEffect(() => {
        getConversations();
    }, []);

    usePolling(getConversations, 5000);

    return (
        <div className="p-6 space-y-4 text-white border-gray-700">
            <h2 className="text-2xl font-bold">Painel de Espera</h2>
            <div className="space-y-4">
                {conversations.length === 0 ? (
                    <p className="text-gray-400">Não há conversas pendentes.</p>
                ) : (
                    conversations.map((conversation) => (
                        <div key={conversation.id} className="bg-gray-800 border border-gray-700 p-4 rounded-md shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-100">{conversation.clientName}</h3>
                            <p className="text-gray-400">Telefone: {conversation.phoneNumber}</p>
                            <p className="text-gray-400">
                                Iniciada em:
                                {
                                    DateTime.fromISO(conversation.startedAt, { zone: 'utc' })
                                        .setZone('America/Sao_Paulo')
                                        .toFormat('dd/MM/yyyy HH:mm:ss')
                                }

                            </p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-400">Status: {conversation.status === 0 ? "Aguardando" : "Em progresso"}</p>
                                <button
                                    onClick={() => handleCaptureConversation(conversation.id)}
                                    className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-500 transition cursor-pointer">
                                    Capturar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

};