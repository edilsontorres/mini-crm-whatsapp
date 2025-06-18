import { DefaultConection } from './axios';
import { WaitingConversationDto } from '../features/conversations/types/conversationsTypes';

export const getWaitingConversations = async(): Promise<WaitingConversationDto[]> => {
    const response  = await DefaultConection().get<WaitingConversationDto[]>('/conversation/waiting');
    return response.data;
}

export const getUserId = async (token: string) => {

    if(!token) return console.log("Não conseguiu pegar o token");

    const userId = await DefaultConection().get('/auth/me');
    
    return userId.data.id;

}