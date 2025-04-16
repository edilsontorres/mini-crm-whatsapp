import { Request, Response } from "express";
import { processWebhookMessage } from '../services/webhookServices';

export const handleIcommingMessage = async (req: Request, res: Response) => {
    try{
        const {phoneNumber, message} = req.body;

        if(!phoneNumber || !message){
            res.status(400).json({error: 'Dados inválidos'});
        }
        
        await processWebhookMessage(phoneNumber, message);
        res.status(200).json({message: 'Mensagem recebida com sucesso'});
    } catch(error){
        console.log('Erro ao processar a mensagem', error);
        res.status(500).json({message: 'Erro interno'});
    }
};