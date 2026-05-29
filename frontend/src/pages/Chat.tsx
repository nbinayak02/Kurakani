import ChatHeader from "../components/ChatHeader";
import MessageBox from "../components/MessageBox";
import ChatBubbleOthers from "../components/ChatBubbleOthers";
import ChatBubbleSelf from "../components/ChatBubbleSelf";
import MessageInputBar from "../components/MessageInputBar";

const Chat = () => {
    return <>
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-3xl h-xl bg-primary border-2 border-primary rounded-xl px-4 py-2 shadow-glass">

                {/* chat header */}
                <ChatHeader />

                {/* message box */}
                <MessageBox>
                    <ChatBubbleOthers />
                    <ChatBubbleSelf />
                </MessageBox>

                {/* message input */}
                <MessageInputBar />
            </div>
        </div>
    </>
};

export default Chat;