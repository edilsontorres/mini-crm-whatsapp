import { Message, Whatsapp } from "venom-bot";
import { downloadMedia } from "../utils/mediaUtils";

export const handleIncomingMedia = async (client: Whatsapp, msg: Message): Promise<{ filePath: string, type: string } | null> => {
    const knowMediaTypes = ['image', 'video', 'audio', 'file', 'ptt'];
    const isMedia = msg.mimetype || knowMediaTypes.includes(msg.type);

    if (!isMedia || !msg.id || !msg.mimetype) return null;


    try {
        const mediaBuffer = await client.decryptFile(msg);
        const base64Data = mediaBuffer.toString("base64");

        const fileName = `${Date.now()}_${msg.id}`;
        const filePath = await downloadMedia(base64Data, msg.mimetype, fileName);

        return { filePath, type: msg.type };

    } catch (error) {
        console.error('Erro ao processar mídia recebida:', error);
        return null;
    }
};
