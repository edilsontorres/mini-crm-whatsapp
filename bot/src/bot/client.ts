import { create, Whatsapp } from 'venom-bot';
import { handleIncomingMessage } from '../services/webhookServices';

let clientInstance: Whatsapp;

export const initWhatsapp = async (): Promise<Whatsapp> => {

    if (clientInstance) return clientInstance;


    clientInstance = await create({ session: 'crm-session', headless: "new", catchQR(base64Qrimg) { } })
    console.log('Whatsapp client iniciado!');

    clientInstance.onMessage(async (msg) => {
        
        if(msg.isGroupMsg) return null;
        if(msg.from == "status@broadcast") return null;

        try {

            await handleIncomingMessage(clientInstance, msg);

        } catch (error: any) {
            console.error('Erro ao enviar webhook para o backend:');

            if (error.response) {
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
                console.error('Data:', error.response.data);
            } else if (error.request) {
                console.error('Requisição foi feita, mas sem resposta:', error.request);
            } else {
                console.error('Erro ao configurar a requisição:', error.message);
            }

            console.error('Stack:', error.stack);
        }
    });

    return clientInstance;
}


export const getClient = (): Whatsapp => clientInstance;
