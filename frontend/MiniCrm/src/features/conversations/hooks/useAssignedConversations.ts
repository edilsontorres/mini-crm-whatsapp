import { useEffect, useState } from "react"
import { AssignedPanel } from "../types/assignedConversation"
import { DefaultConection } from "../../../api/axios";
import { usePolling } from "./usePolling";

export const useAssignedConversation = () => {
    const [conversations, setConversations] = useState<AssignedPanel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const userId = "6C32373A-AD0A-46BF-9E46-B0288A395AEB";

    const fetchAssigned = async () => {
        try {

            const response = await DefaultConection().get<AssignedPanel[]>(`/conversation/assigned?userId=${userId}`);
            setConversations(response.data);

        } catch (error) {
            console.log("Erro ao buscar conversas atribuidas: ", error);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchAssigned();
    }, [])

    usePolling(fetchAssigned, 3000);

    return { conversations, loading };
}