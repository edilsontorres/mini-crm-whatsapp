import { useEffect, useRef, useState } from "react";
import { useConversationDetail } from "../hooks/useConversationDetail";
import { useMessageSender } from "../hooks/useSendMessage";
import { useFinishConversation } from "../hooks/useFinishedConversation";

export const ConversationDetail = () => {
  const { conversation, messages, loading } = useConversationDetail();
  const { sendMessage, sending } = useMessageSender(conversation);
  const { finishConversation } = useFinishConversation(conversation);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  }, [messages]);


  const handleSendMessage = async () => {
    await sendMessage(newMessage);
    setNewMessage("");
  };

  const handleFinishConversation = async () => {
    await finishConversation()
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!conversation) return <p>Conversa não encontrada.</p>;

  return (

    <div className="p-4 flex flex-col h-screen">
      {conversation?.status !== "Finished" && (
        <button
          onClick={handleFinishConversation}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Finalizar conversa
        </button>
      )}
      <h2 className="text-xl font-bold mb-4">
        Conversa com {conversation.clientName}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 h-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[70%] ${msg.isFromClient
              ? "bg-gray-200 text-left"
              : "bg-green-200 text-right ml-auto"
              }`}
          >
            <p>{msg.content}</p>
            <span className="block text-xs text-gray-500 mt-1">
              {new Date(msg.sentAt).toLocaleTimeString()}
            </span>

          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite sua resposta..."
          className="flex-1 border rounded-lg p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          disabled={sending}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Enviar
        </button>

      </div>
    </div>
  );
}
