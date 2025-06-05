import { RequestHandler } from 'express';
import { sendMessageToClient } from '../services/whatsappService';

export const sendMessage: RequestHandler = async (req, res) => {

    const { phoneNumber, content } = req.body;

    if (!phoneNumber || !content) {
        res.status(400).json({ error: 'Número e mensagem são obrigatórios.' });

    }

    try {
        await sendMessageToClient(phoneNumber, content);
        res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso.' });

    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }
};