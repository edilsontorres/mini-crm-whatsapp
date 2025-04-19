import { useConversationDetail } from "../hooks/useConversationDetail";

export const ConversationDetail = () => {
  const { conversation, messages, loading } = useConversationDetail();

  if (loading) return <p>Carregando...</p>;
  if (!conversation) return <p>Conversa não encontrada.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Conversa com {conversation.clientName}</h2>

      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[70%] ${
              msg.isFromClient ? "bg-gray-200 text-left" : "bg-green-200 text-right ml-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
