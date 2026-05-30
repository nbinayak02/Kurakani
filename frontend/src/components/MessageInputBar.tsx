import { Image, Send } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

type Props = {
    onSend: (inputMessage: string) => void;
    setTyping: Dispatch<SetStateAction<boolean>>;
};

const MessageInputBar = ({
    onSend,
    setTyping,
}: Props) => {
    const [inputMessage, setInputMessage] = useState<string>("");

    return (
        <div className="w-full flex flex-row gap-2 items-center justify-between border-t-2 border-primary pt-4">
            <button className="btn-glass p-2 rounded-lg">
                <Image />
            </button>
            <input
                type="text"
                placeholder="Type your message here..."
                className="w-full bg-transparent border-2 border-primary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.currentTarget.value)}
                onFocus={() => setTyping(true)}
                onBlur={() => setTyping(false)}
            />
            <button
                className="btn-glass p-2 rounded-lg"
                onClick={() => onSend(inputMessage)}
            >
                <Send />
            </button>
        </div>
    );
};
export default MessageInputBar;
