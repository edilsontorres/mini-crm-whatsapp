import EmojiPicker from "emoji-picker-react";
import { Theme } from 'emoji-picker-react';
import { Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type EmojiPickerButtonProps = {
    onSelectEmoji: (emoji: string) => void;
}
export const EmojiPickerButton = ({ onSelectEmoji }: EmojiPickerButtonProps) => {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    const handleEmojiClick = (emojiData: any) => {
        onSelectEmoji(emojiData.emoji);
        setShowPicker(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPicker(false);
                console.log("Aqui é a função que escuta o clique fora")
            }
        };

        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
            console.log("Cliquei no emoji e o estado agora é: ", showPicker)
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            console.log("Cliquei novamente no emoji para fechar e o estado é: ", showPicker)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            console.log("E esse retorno")
        };
    }, [showPicker]);


    return (
        <div className="relative" ref={pickerRef}>
            <Smile
                type="button"
                onClick={() => setShowPicker((prev) => !prev)}
                className="text-gray-400 hover:text-gray-200 w-6 h-6 cursor-pointer"
            />
            {showPicker && (
                <div className="absolute bottom-12 left-0 z-50 bg-gray-800 rounded-lg shadow-lg p-2">
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        autoFocusSearch={false}
                        lazyLoadEmojis
                        theme={Theme.DARK}
                    />

                </div>
            )}
        </div>
    );
};