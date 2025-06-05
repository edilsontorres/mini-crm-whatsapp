import { Message, Whatsapp } from "venom-bot";
import { handleIncomingMedia } from "../helpers/handleIncomingMedia";
import axios from "axios";
import { sendMediaToBackend } from "../utils/mediaUtils";

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

        try {
            await sendMediaToBackend(mediaData.filePath, payLoad);
        } catch (error: any) {
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