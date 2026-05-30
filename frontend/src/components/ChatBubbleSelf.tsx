import type { MessageObj } from "../types/chat";

const ChatBubbleSelf = ({ messageObj }: { messageObj: MessageObj }) => {
    return (
        <div className="w-fit max-w-2/3 self-end bg-blue-600/50 rounded-br-none rounded-2xl p-2 mt-2">
            <div className="flex flex-row gap-2 items-center mb-1">
                <p className="font-bold">{messageObj.sender.username}</p>
                <p className="font-light text-sm">15:30</p>
            </div>
            {messageObj.message}
        </div>
    );
}
export default ChatBubbleSelf;