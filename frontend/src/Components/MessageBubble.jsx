import { useEffect } from "react";
import getDuration from "../Utility/Date";
import { useState } from "react";

const MessageBubble = (props) => {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    setDuration(getDuration(props.timestamp));
  }, [props])

  return (
    <div className="m-4 ">
      <div className="flex flex-row items-center">
        <p className="text-[14px] px-2 text-gray-400 font-semibold capitalize">
          {props.sender}
        </p>
        <p className="text-[11px] font-semibold px-2 text-gray-400">
          {duration}
        </p>
      </div>
      <div
        className={`h-fit cursor-pointer max-w-full p-2  rounded-xl transition-colors ${
          props.user === props.sender
            ? `text-message-sender-text-light bg-message-sender-light dark:bg-message-sender-dark hover:bg-greenAccentHoverLight dark:hover:bg-greenAccentHover`
            : `text-message-receiver-text-light dark:text-message-receiver-text-dark bg-gray-300 dark:bg-message-receiver-dark hover:bg-gray-200 dark:hover:bg-gray-600`
        }`}
      >
        {props.msg}
      </div>
    </div>
  );
};

export default MessageBubble;
