import { SendHorizontal } from "lucide-react";

type LegendaInputProps = {
    newMessage: string;
    setNewMessage: (value: string) => void;
    handleSendMessage: () => void;
    inputRef: React.Ref<HTMLInputElement>;
};

export const LegendaInput =({ newMessage, setNewMessage, handleSendMessage, inputRef }: LegendaInputProps) => {
    return (
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
    )
};