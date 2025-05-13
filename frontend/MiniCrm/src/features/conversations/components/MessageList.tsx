import { Message } from "../types/conversationsTypes";
import { MessageItem } from "./MessageItem";



type Props = {
  messages: Message[];
  bottomRef: React.Ref<HTMLDivElement>;
};

export function MessageList({ messages, bottomRef }: Props) {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 mb-4 h-full pl-4 pr-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
