import { useEffect, useRef, useState } from "react";
import { useConversationDetail } from "../hooks/useConversationDetail";
import { useMessageSender } from "../hooks/useSendMessage";
import { useFinishConversation } from "../hooks/useFinishedConversation";
import { DateTime } from "luxon";
import { EmojiPickerButton } from "../../../components/EmojiPickerButton";


type Props = {
  conversationId?: string;
  onConversationFinished: () => void
}

export const ConversationDetail = ({ conversationId, onConversationFinished }: Props) => {
  const { conversation, messages, loading } = useConversationDetail(conversationId);
  const { sendMessage, sending } = useMessageSender(conversation);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [newMessage, setNewMessage] = useState<string>("");


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);


  const handleSendMessage = async () => {
    await sendMessage(newMessage);
    setNewMessage("");
  };

  const { finishConversation } = useFinishConversation(conversation, onConversationFinished);


  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!conversation) return <p>Conversa não encontrada.</p>;

  return (

    <div className="p-4 flex flex-col h-screen bg-cover bg-center" style={{ backgroundImage: `url('../../../../public/bg.jpg')` }}>
      {conversation?.status !== "Finished" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={finishConversation}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-700 cursor-pointer"
          >
            Finalizar
          </button>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4  text-gray-100">
        Conversa com {conversation.clientName}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 h-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[30%] ${msg.isFromClient
              ? "bg-gray-700 text-left text-gray-300"
              : "bg-green-800 text-left text-gray-100 ml-auto"
              }`}
          >
            <p className="whitespace-pre-wrap break-words">{msg.content}</p>
            <span className="block text-xs text-gray-500 mt-1">
              {
                DateTime.fromISO(msg.sentAt, { zone: 'utc' })
                  .setZone('America/Sao_Paulo')
                  .toFormat('dd/MM/yyyy HH:mm:ss')
              }
            </span>

          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center space-x-2 mt-4 relative">
        <EmojiPickerButton
          onSelectEmoji={(emoji) => setNewMessage((prev) => prev + emoji)}
        />
        <textarea
          ref={textareaRef}
          placeholder="Digite uma mensagem..."
          className="resize-none p-2 rounded-lg w-full bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 overflow-hidden"
          rows={1}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          onClick={handleSendMessage}
          disabled={sending}
          className="bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer hover:bg-green-600 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
