const ChatRoom = (props) => {
  return (
    <div className="bg-chat-list-item-hover-light dark:bg-chat-list-item-dark max-w-62 w-fit rounded-xl p-3 flex flex-row gap-4 justify-evenly cursor-pointer hover:bg-chat-list-item-light dark:hover:bg-chat-list-item-hover-dark transition-colors">
      {/* logo */}
      <div className="w-10 h-10 rounded-full bg-amber-500 text-center leading-10 font-black text-white">
        DC
      </div>

      {/* text  */}
      <div className="w-3/4 md:hidden lg:block">
        <p className="text-xm font-bold text-chat-list-text-light dark:text-chat-list-text-dark">
          Default Chat
        </p>
        <p
          className={`truncate text-xs font-bold text-chat-list-subtitle-light dark:text-chat-list-subtitle-dark overflow-ellipsis ${
            props.isClicked ? `font-normal` : ``
          }`}
        >
          ChatBot: Welcome to chat group.
        </p>
      </div>
    </div>
  );
};

export default ChatRoom;
