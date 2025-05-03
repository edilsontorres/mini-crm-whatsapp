import { DateTime } from "luxon";
import { MediaType, Message } from "../types/conversationsTypes";


type Props = {
  msg: Message;
};

export function MessageItem({ msg }: Props) {
  return (
    <div
      key={msg.id}
      className={`p-2 rounded-lg max-w-[30%] ${
        msg.isFromClient
          ? "bg-gray-700 text-left text-gray-300"
          : "bg-green-800 text-left text-gray-100 ml-auto"
      }`}
    >
      {/* Renderiza imagem */}
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

      {/* Conteúdo (texto/legenda) */}
      <p className="whitespace-pre-wrap break-words">{msg.content}</p>

      {/* Data/Hora */}
      <span className="block text-xs text-gray-500 mt-1">
        {DateTime.fromISO(msg.sentAt, { zone: "utc" })
          .setZone("America/Sao_Paulo")
          .toFormat("dd/MM/yyyy HH:mm:ss")}
      </span>
    </div>
  );
}