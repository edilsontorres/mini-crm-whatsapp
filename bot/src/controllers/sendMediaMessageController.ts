import { RequestHandler } from 'express';
import { sendMessageToClient } from '../services/whatsappService';


export const sendMediaMessage: RequestHandler = async (req, res) => {
    console.log("Payload recebido: ", req.body);

    const { phoneNumber, content, filePath, publicUrl, type } = req.body;

    if (!phoneNumber) {
        res.status(400).json({ error: 'Número obrigatórios.' });
    }

    try {
        await sendMessageToClient(phoneNumber, content, filePath, publicUrl, type);
        res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso.' });

    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }
};