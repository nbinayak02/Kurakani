import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  //server address
  const host = import.meta.env.VITE_BASE_URL;

  //create socket when app runs
  useEffect(() => {
    const socketInstance = io(host);

    socketInstance.on("connect", () => setIsConnected(true));
    socketInstance.on("disconnect", () => setIsConnected(false));

    setSocket(socketInstance);

    //disconnect before exiting
    return () => {
      //first remove all listeners
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, [host]);

  //socket creation is dependent on host url so place it in dependency list

  //make socket accessible to all child components
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

//custom hook for easier use
export const useSocket = () => useContext(SocketContext);
