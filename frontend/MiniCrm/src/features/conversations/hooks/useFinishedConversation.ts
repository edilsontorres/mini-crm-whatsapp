import { useNavigate } from "react-router-dom";
import { DefaultConection } from "../../../api/axios";
import { Conversation } from "../types/conversationsTypes";


export const useFinishConversation = (conversation: Conversation | null) => {
    const navigate = useNavigate();

    const finishConversation = async () => {
        try {
            const response = await DefaultConection().put(`/conversation/${conversation?.id}/finish`);
            if (response.data.status === "Finished") {
                navigate("/waiting-panel");
            }

        } catch (error) {
            console.error("Erro ao finalizar conversa:", error);
        }
    }

    return { finishConversation };
}

