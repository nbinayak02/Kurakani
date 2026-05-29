import { Image, Send } from "lucide-react";

const MessageInputBar = () => {
    return (
        <div className="w-full flex flex-row gap-2 items-center justify-between border-t-2 border-primary pt-4">
            <button className="btn-glass p-2 rounded-lg">
                <Image />
            </button>
            <input type="text" placeholder="Type your message here..." className="w-full bg-transparent border-2 border-primary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="btn-glass p-2 rounded-lg">
                <Send />
            </button>
        </div>
    );
}
export default MessageInputBar;