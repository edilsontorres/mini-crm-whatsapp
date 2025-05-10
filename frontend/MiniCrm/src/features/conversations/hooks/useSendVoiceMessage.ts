import { DefaultConection } from "../../../api/axios";
import { Conversation, MediaType } from "../types/conversationsTypes";


export const sendVoiceMessageAsync = (conversation: Conversation | null) => {

  const sendVoiceMessage = async (content: string | null, type: MediaType, file?: File) => {
    if (!conversation || !file || type !== MediaType.Audio) return

    try {
      const formData = new FormData();
      formData.append('conversationId', conversation.id.toString());
      formData.append('isFromClient', 'false');
      if(content) formData.append('content', content);
      

      if (file) {
        formData.append('file', file, 'audio.webm');
        formData.append('type', MediaType[type]);
      }

      await DefaultConection().post('/message/send-media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (error) {
      console.error("Erro ao enviar a mensagem com mídia: ", error);
    } 
  };

  return { sendVoiceMessage };
};
