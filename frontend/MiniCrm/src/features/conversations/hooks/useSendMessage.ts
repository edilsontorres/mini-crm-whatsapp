import { useState } from "react";
import { DefaultConection } from "../../../api/axios";
import { Conversation, MediaType } from "../types/conversationsTypes";


export const useMessageSender = (conversation: Conversation | null) => {
  const [sending, setSending] = useState(false);

  const sendMessage = async (content: string) => {
    if (!conversation || !content.trim()) return;

    try {
      setSending(true);

      await DefaultConection().post('/webhook/respond', {
        conversationId: conversation.id,
        phoneNumber: conversation.phoneNumber,
        message: content.trim(),
        isFromClient: false,
      });
    } catch (error) {
      console.error("Erro ao enviar a mensagem: ", error);
    } finally {
      setSending(false);
    }
  };

  const sendMediaMessage = async (content: string | null, type: MediaType, file?: File) => {
    if (!conversation || !file) return;

    try {
      setSending(true);
      const formData = new FormData();
      formData.append('conversationId', conversation.id.toString());
      formData.append('isFromClient', 'false');
      if(content) formData.append('content', content);
      


      if (file) {
        formData.append('file', file);
        formData.append('type', type);
      }

      await DefaultConection().post('/message/send-media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      

    } catch (error) {
      console.error("Erro ao enviar a mensagem com mídia: ", error);
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending, sendMediaMessage };
};