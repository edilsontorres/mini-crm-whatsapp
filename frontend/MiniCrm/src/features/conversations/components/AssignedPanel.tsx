import { DefaultConection } from "../../../api/axios";
import { useAssignedConversation } from "../hooks/useAssignedConversations";
import { Message } from "../types/conversationsTypes";

interface AssignedPanelProps {
  onSelectConversation: (conversationId: string) => void;
  selectedId: string | null;
}

export const AssignedPanel = ({ onSelectConversation, selectedId }: AssignedPanelProps) => {
  const { conversations, loading } = useAssignedConversation();

  const handleClick = async (conversationId: string) => {
    await DefaultConection().get<Message[]>(`message/conversation/${conversationId}`);
    onSelectConversation(conversationId);
  }

  if (loading) return <div className="p-2 text-sm text-gray-500">Carregando atribuídas...</div>;

  return (
    <div className="border-b p-2 border-gray-700">
      <div className="px-4 py-3 border-b  border-gray-700 flex items-center gap-2 sticky top-0 bg-gray-900 z-10">
        <h2 className="text-lg font-semibold text-white">Meus atendimentos abertos</h2>
      </div>
      <ul className="divide-y divide-gray-700">
        {conversations.map((conv) => {
          const isActive = selectedId === conv.id.toString();
          return (
          <li
            key={conv.id}
            onClick={() => handleClick(conv.id.toString())}
            className={`px-4 py-3 cursor-pointer hover:bg-blue-600 ${ isActive ? 'bg-blue-700' : ''}`}
          >
            <p className="font-medium text-white">{conv.clientName}</p>
            <div className="text-xs text-gray-400">{conv.phoneNumber}</div>

          </li>
          )
        }
        )}
      </ul>
    </div>
  );
};