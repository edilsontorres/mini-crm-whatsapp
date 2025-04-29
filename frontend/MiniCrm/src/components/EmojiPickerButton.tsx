import EmojiPicker from "emoji-picker-react";
import { Theme } from 'emoji-picker-react';
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
            }
        };

        if (showPicker) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPicker]);


    return (
        <div className="relative" ref={pickerRef}>
            <button
                type="button"
                onClick={() => setShowPicker((prev) => !prev)}
                className="text-gray-400 hover:text-gray-200"
            >
                😊
            </button>
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