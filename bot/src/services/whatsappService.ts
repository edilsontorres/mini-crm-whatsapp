import { getClient } from '../bot/client';

export const sendMessageToClient = async (phoneNumber: string, message: string): Promise<void> => {
    const client = getClient();
    if (!client) {
        console.error('WhatsApp client não inicializado');
        return;
    }

    await client.sendText(phoneNumber, message);
};