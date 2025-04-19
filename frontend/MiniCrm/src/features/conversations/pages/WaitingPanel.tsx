import { useEffect, useState } from "react";
import { DefaultConection } from "../../../api/axios";
import { useNavigate } from "react-router-dom";

interface WaitingConversation {
    id: number;
    clientName: string;
    phoneNumber: string;
    startedAt: string;
    status: number;
}

export const WaitingPanel = () => {
    const [conversations, setConversations] = useState<WaitingConversation[]>([]);
    const navigate = useNavigate();

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
            userId: "6C32373A-AD0A-46BF-9E46-B0288A395AEB"
        }
      

        try {
            await DefaultConection().put(`conversation/${conversationId}/assing`, data);
            navigate(`/conversation/${conversationId}`, {
                state: { data }
            });
            
            getConversations();
        } catch (error) {
            console.error("Erro ao buscar as conversas não saiu daqui: ", error);
        }
    }

    useEffect(() => {
        getConversations();
    }, []);

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">Painel de Espera</h2>
            <div className="space-y-4">
                {conversations.length === 0 ? (
                    <p>Não há conversas pendentes.</p>
                ) : (
                    conversations.map((conversation) => (
                        <div key={conversation.id} className="border p-4 rounded-md shadow-sm">
                            <h3 className="text-xl font-semibold">{conversation.clientName}</h3>
                            <p className="text-gray-500">Telefone: {conversation.phoneNumber}</p>
                            <p className="text-gray-500">Iniciada em: {new Date(conversation.startedAt).toLocaleString()}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500">Status: {conversation.status === 0 ? "Aguardando" : "Em progresso"}</p>
                                <button
                                    onClick={() => handleCaptureConversation(conversation.id)}
                                    className="bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600">
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