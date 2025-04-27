import { create, Whatsapp } from 'venom-bot';
import axios from 'axios';

let clientInstance: Whatsapp;

export const initWhatsapp = async (): Promise<Whatsapp> => {

    if (clientInstance) {
        return clientInstance;
    }


    clientInstance = await create({ session: 'crm-session', headless: false })
    console.log('Whatsapp client iniciado!');

    clientInstance.onMessage(async (msg) => {
        

        if (msg.fromMe) return;
        const phoneNumber = msg.from;
        const message = msg.body;
        const clientName = msg.sender?.pushname || "Client";

        // console.log('Nome do cliente: ', clientName);
        // console.log(`De: ${phoneNumber}`);
        // console.log(`Conteúdo: ${message}`);

        try {

            await axios.post("http://localhost:5070/api/webhook", {
                phoneNumber,
                message,
                clientName
            });

            console.log('Webhook enviado com sucesso!');
        }
        catch (error) {
            console.error('Erro ao enviar webhook para o backend: ', error);
        }
    });

    return clientInstance;
}


export const getClient = (): Whatsapp => clientInstance;
