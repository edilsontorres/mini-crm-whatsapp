import { getClient } from '../bot/client';

export const sendMessageToClient = async (
  phoneNumber: string,
  content?: string,
  filePath?: string,
  publicUrl?:string,
  type?: string
): Promise<void> => {
  const client = getClient();


  if (content) {
    await client.sendText(phoneNumber, content);
  }

  if (publicUrl && type && filePath) {
   const resolvedPath = publicUrl;

    const mediaType = Number(type);

    switch (mediaType) {
      case 1:
        await client.sendVoice(phoneNumber, resolvedPath);
        break;
      case 2:
        await client.sendImage(phoneNumber, resolvedPath, __filename, content || "");
        break;
      case 3:
        await client.sendFile(phoneNumber, resolvedPath, 'arquivo');
        break;
      default:
        throw new Error(`Tipo de mídia não suportado: ${resolvedPath}`);
    }
  }
  
};
