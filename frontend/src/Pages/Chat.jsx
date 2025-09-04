import { useEffect, useState } from "react";
import ChatBox from "../Components/ChatBox";
import ChatRoom from "../Components/ChatRoom";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [user, setUser] = useState(null);
  const [chatListClick, setChatListClick] = useState(false);
  const { logout, token } = useAuth();
  const navigate = useNavigate();
  const host = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchUser();
  }, []);

  const handleCloseChatList = (isClicked) => {
    setChatListClick(isClicked);
  };

  const fetchUser = async () => {
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

    const response = await fetch(`${host}/api/kurakani/chat/user`, requestOptions);
    const r = await response.json();
    if (response.ok) {
      setUser(r.user);
    }
  };
  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="bg-cardBgLight dark:bg-cardBgDark rounded-2xl p-6 border border-chat-header-border-light dark:border-chat-header-border-dark shadow-lg shadow-shadow-light dark:shadow-shadow-dark">
        <div className="flex flex-row justify-evenly">
          {/* sidebar */}
          <div className={`${chatListClick ? `hidden md:block` : `block`}`}>
            {/* top bar  */}
            <div className="text-chat-header-text-light dark:text-chat-header-text-dark text-2xl font-bold border-l-4 border-greenAccent px-3 ">
              Kurakani
            </div>

            <div className="mt-10">
              {/* chat list  */}
              <div className="w-full md:w-fit lg:w-[250px] h-[68vh] lg:h-[450px] flex flex-col justify-between gap-5 overflow-y-auto">
                <div onClick={() => setChatListClick(true)}>
                  <ChatRoom isClicked={chatListClick} />
                </div>
              </div>

              {/* logout  */}

              <div>
                <p className="w-fit lg:w-full capitalize text-chat-header-text-light dark:text-gray-400  font-semibold text-center">
                  Namaste, {user}.
                </p>

                <p
                  className="text-sm w-fit lg:w-full mt-3 cursor-pointer hover:text-black transition-colors text-center px-4 py-2 text-chat-list-subtitle-light hover:bg-greenAccent rounded-lg font-semibold"
                  onClick={() => {
                    logout();
                    navigate("/login", { replace: true });
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>

          {/* chat div  */}
          <div
            className={`w-fit h-fit ${
              chatListClick ? `block` : `hidden`
            } md:block lg:w-[700px] md:h-[600px] md:ml-6 md:border-l-2 border-gray-500 md:pl-6`}
          >
            <ChatBox user={user} openChatList={handleCloseChatList} />
            {/* {chatListClick ? (
            ) : (
              <p className="text-center leading-[350px] text-gray-400 text-xl font-semibold">
                Select chat to open.
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
