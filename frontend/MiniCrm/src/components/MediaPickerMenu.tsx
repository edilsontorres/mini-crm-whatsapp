import { useEffect, useRef } from "react";
import { ImageIcon, FileIcon } from "lucide-react";

type Props = {
  onSelectFile: (file: File) => void;
  onSelectImage: (file: File) => void;
  onClose: () => void;
  anchorElement: SVGSVGElement | null;
};

export const MediaPickerMenu = ({ onSelectFile, onSelectImage, onClose, anchorElement }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);


  const handleFileClick = () => fileInputRef.current?.click();
  const handleImageClick = () => imageInputRef.current?.click();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && anchorElement && !anchorElement.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorElement, onClose]);

  return (
    <>

      <div ref={ref} className="absolute bottom-full mb-5 bg-gray-800 rounded-xl shadow-lg p-3 flex flex-col z-50 w-48">
        <div className="flex items-center mb-1 cursor-pointer hover:bg-[#2a3942] rounded-xl p-3">
          <ImageIcon className="w-6 h-6 text-blue-600 mr-2 cursor-pointer" />
          <button
            onClick={handleImageClick}
            className="text-white cursor-pointer"
          >
            Fotos e vídeos
          </button>
        </div>

        <div className="flex items-center cursor-pointer hover:bg-[#2a3942] rounded-xl p-3">
          <FileIcon className="w-6 h-6 text-green-600 mr-2 cursor-pointer" />
          <button
            onClick={handleFileClick}
            className=" text-white cursor-pointer"
          >
            Arquivos
          </button>
        </div>

        {/* Hidden inputs para escolher o arquivo */}
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*,video/*"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.[0]) onSelectImage(e.target.files[0]);
          }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xlsx,.txt"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.[0]) onSelectFile(e.target.files[0]);
          }}
        />
      </div>
    </>
  )
}

