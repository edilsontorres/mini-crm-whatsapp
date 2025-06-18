import { useEffect, useState } from "react"
import { AssignedPanel } from "../types/assignedConversation"
import { DefaultConection } from "../../../api/axios";
import { usePolling } from "./usePolling";
import { getUserId } from "../../../api/conversationApi";
import { useAuth } from "../../screenLogin/auth/AuthContext";

export const useAssignedConversation = () => {
    const [conversations, setConversations] = useState<AssignedPanel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<any>();
    const { token } = useAuth();

    useEffect(() => {
        const fetchUserId = async () => {
            setLoading(true);
            const id = await getUserId(token);
            setUserId(id);
            setLoading(false);
        }

        fetchUserId();
    }, [token]);


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