import ChatHeader from "../components/ChatHeader";
import MessageBox from "../components/MessageBox";
import ChatBubbleOthers from "../components/ChatBubbleOthers";
import ChatBubbleSelf from "../components/ChatBubbleSelf";
import MessageInputBar from "../components/MessageInputBar";
import { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext";
import type { MessageObj, TypingInfo } from "../types/chat";
import { ChatBubbleOthersSkeleton, ChatBubbleSelfSkeleton } from "../components/ChatBubbleSkeletons";
import { useAuth } from "../hooks/useAuth";

const Chat = () => {
    const [activeUsers, setActiveUsers] = useState<number>(0)
    const [totalUsers, setTotalUsers] = useState<number>(0)
    const [typing, setTyping] = useState<boolean>(false)
    const [getTyping, setGetTyping] = useState<TypingInfo | null>(null)
    const [messages, setMessages] = useState<MessageObj[]>([])
    const [isMsgLoading, setIsMsgLoading] = useState<boolean>(true)
    // const [error, setError] = useState()

    const { user } = useAuth()

    // establish socket connection
    const { socket, isConnected } = useSocket();

    useEffect(() => {
        if (!isConnected || !socket) return;

        // get last 20 msgs
        socket.on("lastMessages", (messages: MessageObj[]) => {
            setMessages(messages)
            setIsMsgLoading(false)
            socket.off("lastMessages")
        })

        // get message
        socket.on("recentMessage", (message: MessageObj) => {
            setMessages((prevMessages) => [...prevMessages, message])
        })

        // get typing state
        socket.on("typing", (typingInfo: TypingInfo) => {
            setGetTyping(typingInfo)
        })

        //receive connected user counts
        socket.on("onlineUsersCount", (count: number) => {
            setActiveUsers(count);
        });

        // receive total user count
        socket.on("totalUserCount", (count: number) => {
            setTotalUsers(count);
        })

        return () => {
            socket.off("lastMessages")
            socket.off("recentMessage")
            socket.off("typing")
            socket.off("onlineUsersCount");
            socket.off("totalUserCount");
        }
    }, [isConnected, socket]);

    //socket for sending typing info
    useEffect(() => {
        if (!socket) return;
        if (typing) {
            socket.emit("typing", { state: true, username: user?.username })
        } else {
            socket.emit("typing", { state: false, username: user?.username });
        }
    }, [typing, socket, user]);


    return <>
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-xl md:w-2xl lg:w-3xl h-xl bg-primary border-2 border-primary rounded-xl px-4 py-2 shadow-glass">

                {/* chat header */}
                <ChatHeader
                    totalUsers={totalUsers}
                    activeUsers={activeUsers}
                    isLoading={isMsgLoading}
                    typingIndicator={getTyping}
                />

                {/* message box */}
                <MessageBox>
                    {
                        isMsgLoading ?
                            <div className="flex flex-col gap-3 justify-start items-start animate-pulse">
                                <ChatBubbleOthersSkeleton />
                                <ChatBubbleSelfSkeleton />
                                <ChatBubbleOthersSkeleton />
                                <ChatBubbleSelfSkeleton />
                            </div>
                            :
                            messages?.length === 0 ?
                                <div className="w-full flex flex-row justify-center items-center">
                                    No any messages yet. Start sending!
                                </div>
                                :
                                messages.map((m: MessageObj) => {
                                    return (
                                        <>
                                            {m.sender._id === user?.id ?
                                                <ChatBubbleSelf messageObj={m} key={m._id} />
                                                :
                                                <ChatBubbleOthers messageObj={m} key={m._id} />
                                            }
                                        </>
                                    )
                                })
                    }
                </MessageBox>

                {/* message input */}
                <MessageInputBar
                    onSend={(inputMessage: string) => { socket?.emit("sendMessage", inputMessage) }}
                    setTyping={setTyping}
                />
            </div>
        </div>
    </>
};

export default Chat;