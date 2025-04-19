import { DefaultConection } from './axios';
import { WaitingConversationDto } from '../features/conversations/types/conversationsTypes';

export const getWaitingConversations = async(): Promise<WaitingConversationDto[]> => {
    const response  = await DefaultConection().get<WaitingConversationDto[]>('/conversation/waiting');
    return response.data;
}