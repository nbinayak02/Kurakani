import { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useAuth } from "../Contexts/AuthContext";
import { useSocket } from "../Contexts/SocketContext";
import sortMessages from "../Utility/SortMessages";

const ChatBox = (props) => {
  const [onlineCount, setOnlineCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [messageToSend, setMessageToSend] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [isLoadingMsg, setIsLoadingMsg] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const { token } = useAuth();
  const host = import.meta.env.VITE_BASE_URL;

  // establish socket connection
  const { socket, isConnected } = useSocket();

  // fetch messsages once connection is successful
  useEffect(() => {
    fetchMessage();
  }, []);

  //socket for receiving messages
  useEffect(() => {
    if (!isConnected) return;
    //receive recent message - append recent at last
    socket.on("recentMessage", (msgs) => {
      setAllMessages((existingMsgs) => [...existingMsgs, msgs.createdMsg]);
    });

    //receive typing state
    socket.on("typing", (typingInfo) => {
      typingInfo.state === true ? appendTyping() : removeTyping();
    });

    //receive connected user counts
    socket.on("onlineUsersCount", (count) => {
      setOnlineCount(count);
    });

    return () => {
      socket.off("recentMessage");
      socket.off("typing");
      socket.off("onlineUsersCount");
    }
  }, [socket, isConnected]);

  const appendTyping = () => {
    const childNode = document.createElement("p");
    childNode.innerHTML = "Someone is typing <div class='loader'></div>";
    childNode.id = "someOneIsTyping";
    childNode.classList.add(
      "h-fit",
      "w-fit",
      "p-2",
      "rounded-xl",
      "text-white",
      "text-[13px]",
      "font-semibold",
      "bg-green-800",
      "flex",
      "flex-row",
      "gap-2",
      "mx-6",
      "mb-2",
      "items-center"
    );
    document.getElementById("chat-box").appendChild(childNode);
  };

  const removeTyping = () => {
    const childNode = document.getElementById("someOneIsTyping");
    if (childNode) document.getElementById("chat-box").removeChild(childNode);
  };

  //socket for sending typing info
  useEffect(() => {
    if (!socket) return;
    {
      typing ? socket.emit("typing", true) : socket.emit("typing", false);
    }
  }, [typing, socket]);

  useEffect(() => scrollToBottom(), [allMessages, typing]);

  const scrollToBottom = () => {
    const div = document.getElementById("chat-box");
    div.scrollTop = div.scrollHeight;
  };

  //fetch previous messages
  const fetchMessage = async () => {
    setIsLoadingMsg(true);
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(`${host}/api/kurakani/chat`, requestOptions);
    const r = await response.json();

    if (response.ok) {
      const sortedMessage = sortMessages(r.data);
      setAllMessages(sortedMessage);
      setIsLoadingMsg(false);
    } else {
      setLoadingError(data.message);
      setIsLoadingMsg(false);
    }
  };

  //send message
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    socket.emit("sendMessage", messageToSend);
    setIsSending(false);
  };

  return (
    <div className="border-2 border-t-0 border-chat-header-border-light dark:border-chat-header-border-dark rounded-t-xl">
      {/* top bar  */}

      {/* chat box  */}
      <div
        id="chat-box"
        className="h-[500px] md:h-[510px] bg-chat-bg-light dark:bg-chat-bg-dark flex flex-col justify-between overflow-auto rounded-t-xl"
      >
        <div className="bg-transparent sticky top-0 backdrop-blur-lg rounded-t-xl px-3 py-2 flex flex-row gap-3 items-center border-b-2 border-chat-header-border-light dark:border-chat-header-border-dark ">
          <div
            className=" md:hidden w-10 h-10 leading-5 text-center text-white p-2 text-2xl mr-4 rounded-full hover:bg-greenAccentHoverLight dark:hover:bg-greenAccentHover hover:text-black"
            onClick={() => props.openChatList(false)}
          >
            &lt;
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500 text-center leading-10 font-black text-white">
            DC
          </div>
          <div>
            <p className="text-chat-header-text-light dark:text-chat-header-text-dark font-bold text-xl">
              {" "}
              Default Chat
            </p>
            <div className="text-offline-status text-xs">
              <div className="w-2 h-2 bg-online-status rounded-full inline-block"></div>{" "}
              {onlineCount} Active Now
            </div>
          </div>
        </div>
        {allMessages &&
          allMessages.map((m, i) => {
            return (
              <div
                key={i}
                className={`${
                  props.user === m.username.username ? `self-end` : `self-start`
                }`}
              >
                <MessageBubble
                  key={i}
                  sender={m.username.username}
                  msg={m.message}
                  timestamp={m.createdAt}
                  user={props.user}
                />
              </div>
            );
          })}
      </div>

      {/* message input box */}
      <div className="border-t-2 border-chat-header-border-light dark:border-slate-700 dark:bg-cardBgDark">
        <form
          className="flex flex-row justify-evenly items-center"
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <textarea
            placeholder="Your message here"
            value={messageToSend}
            className="flex-1 resize-none rounded-xl border 
           border-message-box-border-light dark:border-gray-700
           bg-white dark:bg-slate-800 
           px-4 py-2 m-3 text-chat-list-text-light dark:text-gray-200 
           placeholder-gray-400 dark:placeholder-gray-500 
           font-semibold 
           focus:outline-none focus:ring-1 
           focus:ring-greenAccentLight dark:focus:ring-greenAccent 
           shadow-sm"
            onFocus={() => setTyping(true)}
            onBlur={() => setTyping(false)}
            onChange={(e) => setMessageToSend(e.target.value)}
          />
          <input
            type="submit"
            name="sumbit"
            value="Send"
            className="w-fit md:w-2/12 bg-greenAccent m-2 py-3 rounded-xl hover:bg-greenAccentHoverLight dark:hover:bg-greenAccentHover transition-colors text-xm font-medium shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
            disabled={isSending}
          />
        </form>
      </div>
    </div>
  );
};
export default ChatBox;
