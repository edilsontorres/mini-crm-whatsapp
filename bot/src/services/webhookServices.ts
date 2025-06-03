import { Message, Whatsapp } from "venom-bot";
import { handleIncomingMedia } from "../helpers/handleIncomingMedia";
import axios from "axios";
import { sendMediaToBackend } from "../utils/mediaUtils";
import { MediaType } from "../types/webhook";

export const handleIncomingMessage = async (client: Whatsapp, msg: Message) => {
    if (msg.fromMe) return;

    const phoneNumber = msg.from;
    const message = msg.body;
    const clientName = msg.sender?.pushname || "Client";

    const mapMediaTypeToEnum = (type: string): number => {
        switch (type) {
            case 'ptt': return 1;       // Audio
            case 'image': return 2;     // Image
            case 'video': return 3;     // Video
            case 'document': return 4;  // File
            default: return 0;          // fallback para Texto
        }
    };

    const mediaType = mapMediaTypeToEnum(msg.type);

    // const payLoad = {
    //     phoneNumber,
    //     message,
    //     clientName,
    //     filePath: mediaData?.filePath || null,
    //     type: mediaData?.type ?? 'text'
    // };

    const mediaData = await handleIncomingMedia(client, msg);

    if (mediaData) {
        const payLoad = {
            phoneNumber,
            clientName,
            content: msg.caption || '',
            isFromCLient: true,
            type: mediaType,
            sentAt: new Date().toISOString(),
        };
        console.log("Payload recebido com midia");
        console.log(payLoad);

        try {
            console.log("Tentou enviar!");
            console.log("O que chega aqui? ", mediaData.filePath);
            await sendMediaToBackend(mediaData.filePath, payLoad);
            console.log("Mídia enviada com sucesso ao backend!");
        } catch (error: any) {
            console.log("Não conseguiu enviar!");
            console.log(error.response.data.errors);
            console.error("Erro ao enviar mídia ao backend:", error);
        }
    } else {
        // Mensagem de texto simples
        const payLoad = {
            phoneNumber,
            content: message,
            clientName,
            filePath: null,
            type: mediaType
        };

        try {
            await axios.post("http://localhost:5070/api/webhook", payLoad);
            console.log('Webhook enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar para o messagem de texto para o backend:', error);
        }
    }
}