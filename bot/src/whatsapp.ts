import { create, Whatsapp } from 'venom-bot';
import axios from 'axios';


create({ session: 'crm-session',  headless: false})
    .then((client: Whatsapp) => start(client))
    .catch((error) => {
        console.error('Erro ao iniciar o cliente do WhatsApp: ', error);
    });

function start(client: Whatsapp) {
    console.log('Bot iniciado com sucesso!');

    client.onMessage(async(msg) => {
        
        if (msg.fromMe) return;
        const phoneNumber = msg.from;
        const message = msg.body;

        // console.log('Nova mensagem recebida:');
        // console.log(`De: ${phoneNumber}`);
        // console.log(`Conteúdo: ${message}`);

        try {

            await axios.post("http://localhost:5070/api/webhook", {
                phoneNumber,
                message
            });

            console.log('Webhook enviado com sucesso!');
        }
        catch (error) {
            console.error('Erro ao enviar webhook para o backend: ', error);
        }   
    });
}   