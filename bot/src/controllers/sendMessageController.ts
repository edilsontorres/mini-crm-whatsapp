import { Request, RequestHandler, Response } from 'express';
import { sendMessageToClient } from '../services/whatsappService';

export const sendMessage: RequestHandler = async (req: Request, res: Response) => {
    const { phoneNumber, message } = req.body;

    if (!phoneNumber || !message) {
        return res.status(400).json({ error: 'Número e mensagem são obrigatórios.' });
    }

    try {
        await sendMessageToClient(phoneNumber, message);
        return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso.' });
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        return res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }
};