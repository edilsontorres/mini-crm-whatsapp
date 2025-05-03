import { useEffect, useRef, useState } from "react";
import { useConversationDetail } from "../hooks/useConversationDetail";
import { useMessageSender } from "../hooks/useSendMessage";
import { useFinishConversation } from "../hooks/useFinishedConversation";
import { DateTime } from "luxon";
import { EmojiPickerButton } from "../../../components/EmojiPickerButton";
import { MediaPickerMenu } from "../../../components/MediaPickerMenu";
import { MediaType } from "../types/conversationsTypes";
import { X, SendHorizontal, Plus, Mic, Video } from "lucide-react";

type Props = {
  conversationId?: string;
  onConversationFinished: () => void
}

export const ConversationDetail = ({ conversationId, onConversationFinished }: Props) => {
  const { conversation, messages, loading } = useConversationDetail(conversationId);
  const { sendMessage, sending, sendMediaMessage } = useMessageSender(conversation);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>();
  const [showMediaMenu, setShowMediaMenu] = useState(false);
  const previewUrl = file ? URL.createObjectURL(file) : null;

  useEffect(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      videoRef.current.src = previewUrl!;
      videoRef.current.currentTime = currentTime;
    };
  }, [previewUrl]);

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

      <div className="flex-1 overflow-y-auto space-y-2 mb-4 h-full">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded-lg max-w-[30%] ${msg.isFromClient
              ? "bg-gray-700 text-left text-gray-300"
              : "bg-green-800 text-left text-gray-100 ml-auto"
              }`}
          >
            {msg.type === MediaType.Image && msg.publicUrl && (
              <img
                src={msg.publicUrl}
                alt="Imagem"
                className="rounded-lg max-w-full"
              />

            )}

            {/* Renderiza vídeo */}
            {msg.type === MediaType.Video && msg.publicUrl && (
              <video controls className="rounded-lg max-w-full">
                <source src={msg.publicUrl} />
                Seu navegador não suporta vídeo.
              </video>
            )}

            {/* Renderiza áudio */}
            {msg.type === MediaType.Audio && msg.publicUrl && (
              <audio controls className="w-full">
                <source src={msg.publicUrl} />
                Seu navegador não suporta áudio.
              </audio>
            )}

            {/* Renderiza arquivo */}
            {msg.type === MediaType.File && msg.publicUrl && (
              <a
                href={msg.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-300"
              >
                Baixar arquivo
              </a>
            )}
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
      {file && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center flex flex-col  justify-center p-4 z-50" style={{ backgroundImage: `url('../../../../public/bg.jpg')` }}>
          <X
            onClick={() => {
              setFile(null);
              setMediaType(null);
              setNewMessage("");
            }}
            className="w-10 h-10 text-gray-300 hover:text-white absolute top-4 left-4 p-2 rounded-full cursor-pointer z-20"
          />

          {/* Mascara sobre o preview*/}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Preview */}
          <div className="flex-1 flex items-center justify-center z-10">
            {mediaType === MediaType.Image && (
              <img src={previewUrl!} alt="Preview" className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg" />
            )}
            {mediaType === MediaType.Video && (
              <video  ref={videoRef} src={previewUrl!} controls className="max-h-[80vh] max-w-[90vw] w-full h-full object-contain rounded-lg shadow-lg" />
            )}
            {mediaType === MediaType.Audio && (
              <img src="/audio-placeholder.png" alt="Audio" className="w-32 h-32 object-cover rounded" />
            )}
            {mediaType === MediaType.File && (
              <img src="/file-placeholder.png" alt="File" className="w-32 h-32 object-cover rounded" />
            )}
          </div>

          {/* Legenda + botão */}
          <div className="p-4 flex items-center border-t border-gray-600 bg-[#202c33] z-10">
            <input
              ref={inputRef}
              type="text"
              placeholder="Adicione uma legenda..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="p-2 border rounded-lg mr-2 w-[90%] max-w-[90vw] focus:outline-none border-gray-300 "
            />
            <div className="bg-green-500 rounded-full">
              <SendHorizontal
                onClick={handleSendMessage}
                className="w-12 h-12 text-white p-3 rounded-full z-10 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

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
