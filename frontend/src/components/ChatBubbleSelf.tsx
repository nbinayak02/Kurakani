import type { MessageObj } from "../types/chat";

const ChatBubble = ({
  messageObj,
  userId,
}: {
  messageObj: MessageObj;
  userId: string;
}) => {
  return (
    <div
      className={`w-fit max-w-2/3 rounded-2xl ${messageObj.sender._id === userId ? "self-end bg-blue-600/50 rounded-br-none" : "self-start bg-stone-600/50 rounded-lt-none"} p-2 mt-2`}
    >
      <div className="flex flex-row gap-2 items-center mb-1">
        <p className="font-bold">{messageObj.sender.username}</p>
        <p className="font-light text-sm">
          {new Date(messageObj.createdAt).toDateString()}
        </p>
      </div>
      {messageObj.message}
    </div>
  );
};
export default ChatBubble;
