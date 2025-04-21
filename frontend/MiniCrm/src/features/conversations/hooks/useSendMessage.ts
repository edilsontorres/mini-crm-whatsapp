import { useState } from "react";
import { DefaultConection } from "../../../api/axios";
import { Conversation } from "../types/conversationsTypes";

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

  return { sendMessage, sending };
};