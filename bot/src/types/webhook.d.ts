export interface WhatsAppMessage {
    from: string;
    message: string;
    timestamp: string;
}

export enum MediaType {
    Texto = 0,
    Audio = 1,
    Image = 2,
    Video = 3,
    File = 4
}