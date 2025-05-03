export interface WaitingConversationDto {
    id: number;
    clientId: string;
    clientName: string;
    phoneNumber: string;
    startedAt: string;
    status: number;
}

export interface Conversation {
    id: number;
    clientId: string;
    clientName: string;
    phoneNumber: string,
    userId: string;
    userName: string | null;
    status: string;
    startedAt: string;
    assignedAt: string;
    finishedAt: string | null;
}

export interface Message {
    id: number;
    content: string;
    sentAt: string;
    isFromClient: boolean;
    type: MediaType;
    publicUrl: string

}

export enum MediaType {
    Texto = 0,
    Audio = 1,
    Image = 2,
    Video = 3,
    File = 4
}
