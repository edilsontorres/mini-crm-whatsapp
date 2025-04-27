import { useState } from "react";
import { WaitingPanel } from "../components/WaitingPanel";
import { ConversationDetail } from "../components/ConversationDetail";
import { AssignedPanel } from "../components/AssignedPanel";

export const ChatWorkspace = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);


  return (
    <div className="flex h-screen bg-gray-900 text-white min-h-screen">
      {/* Sidebar: Waiting and Active Conversations */}
      <div className="w-[350px] border-r flex flex-col border-gray-700">
        <div className="flex-1 overflow-y-auto">
          <WaitingPanel onCapture={() => setSelectedConversationId} />
        </div>
      </div>
      <div className=" w-[350px] border-r border-gray-700">
        <AssignedPanel onSelectConversation={setSelectedConversationId} selectedId={selectedConversationId} />
      </div>


      {/* Main Chat Area */}
      <div className="flex-1">
        {selectedConversationId ? (
          <ConversationDetail conversationId={selectedConversationId} onConversationFinished={() => setSelectedConversationId(null)} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Selecione uma conversa para começar
          </div>
        )}
      </div>
    </div>
  );
}