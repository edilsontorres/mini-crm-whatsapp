import { useEffect, useRef, useState } from "react";
import { useConversationDetail } from "../hooks/useConversationDetail";
import { useMessageSender } from "../hooks/useSendMessage";
import { useFinishConversation } from "../hooks/useFinishedConversation";
import { EmojiPickerButton } from "../../../components/EmojiPickerButton";
import { MediaPickerMenu } from "../../../components/MediaPickerMenu";
import { MediaType } from "../types/conversationsTypes";
import { SendHorizontal, Plus, Mic, X } from "lucide-react";
import { MediaPreview } from "./MediaPreview";
import { LegendaInput } from "./LegendaInput";
import { MessageList } from "./MessageList";

type Props = {
  conversationId?: string;
  onConversationFinished: () => void
}

export const ConversationDetail = ({ conversationId, onConversationFinished }: Props) => {
  const { conversation, messages, loading } = useConversationDetail(conversationId);
  const { sendMessage, sendMediaMessage } = useMessageSender(conversation);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [newMessage, setNewMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [showMediaMenu, setShowMediaMenu] = useState(false);

  const previewUrl = file ? URL.createObjectURL(file) : null;

  useEffect(() => {

    if (previewUrl && inputRef.current) {
      inputRef.current.focus();
    }
  }, [previewUrl]);

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
    if (file && mediaType) {
      await sendMediaMessage(newMessage, mediaType, file);
      setFile(null);
      setMediaType(null);
    } else {
      await sendMessage(newMessage);
    }
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

    <div className="relative p-4 flex flex-col h-screen bg-cover bg-center" style={{ backgroundImage: `url('../../../../public/bg.jpg')` }}>
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

      <MessageList messages={messages} bottomRef={bottomRef} />

      <div className={`absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center flex flex-col  justify-center p-4 z-50 ${file ? 'block' : 'hidden'}`}
        style={{ backgroundImage: `url('../../../../public/bg.jpg')` }}>
        <X
          onClick={() => {
            setFile(null);
            setMediaType(null);
            setNewMessage("");
          }}
          className="w-10 h-10 text-gray-300 hover:text-white absolute top-4 left-4 p-2 rounded-full cursor-pointer z-20"
        />
        <MediaPreview
          mediaType={mediaType}
          previewUrl={previewUrl}
          videoRef={videoRef}
        />


        <LegendaInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          inputRef={inputRef}
        />

      </div>


      <div className=" flex items-center bg-gray-800 p-2 gap-3">
        <EmojiPickerButton
          onSelectEmoji={(emoji) => setNewMessage((prev) => prev + emoji)}
        />
        <div className="relative">
          <Plus
            onClick={() => setShowMediaMenu((prev) => !prev)}
            className=" w-8 h-8 text-gray-400 hover:text-gray-200 cursor-pointer"
          />

          {showMediaMenu && (
            <MediaPickerMenu
              onSelectFile={(file) => {
                setFile(file);
                setMediaType(MediaType.File)
                setShowMediaMenu(false);
              }}
              onSelectImage={(file) => {
                setFile(file);
                const detectedType = file.type.startsWith("video/")
                  ? MediaType.Video
                  : MediaType.Image;
                setMediaType(detectedType);
                setShowMediaMenu(false);
              }}
              onClose={() => setShowMediaMenu(false)}
            />
          )}
        </div>

        <textarea
          ref={textareaRef}
          placeholder="Digite uma mensagem..."
          className="resize-none p-2 rounded-lg w-full bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 overflow-hidden"
          rows={1}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button>
          {newMessage.trim() === "" ? (
            <Mic className="w-6 h-6 text-gray-400 hover:text-gray cursor-pointer" />
          ) : (
            <SendHorizontal className="w-6 h-6 text-gray-400 hover:text-gray cursor-pointer" onClick={handleSendMessage} />
          )}
        </button>
      </div>
    </div >
  );
}