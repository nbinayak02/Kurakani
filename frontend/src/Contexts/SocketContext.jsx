import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import { useRef } from "react";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  //using useRef hook because useState re-renders when value changes so it may cause to re create socket connection, where useRef holds the reference and can be used across re-renders i.e. it doesn't cause re-render and it's value also doesn't change across re-renders

  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const tokenReference = useRef(null);

  //server address
  const host = import.meta.env.VITE_BASE_URL;

  //create socket when app runs
  useEffect(() => {
    //if token is not available yet, mainly in login page then don't create socket connection

    if (!token) {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        setIsConnected(false);
      }
      tokenReference.current = null;
      return;
    }

    console.log("Token from previous render: ", tokenReference.current);
    console.log("Socket from previous render: ", socket.current);

    //if token hasn't change and socket already exist then no need to proceed forward
    if (tokenReference.current === token && socket.current) return;

    const socketInstance = io(host, { auth: { token } });
    socketInstance.on("connect", () => setIsConnected(true));
    socketInstance.on("disconnect", () => setIsConnected(false));

    socket.current = socketInstance;
    tokenReference.current = token;

    //disconnect before exiting
    return () => {
      //first remove all listeners
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, [token]);

  //make socket accessible to all child components
  return (
    <SocketContext.Provider value={{ socket: socket.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

//custom hook for easier use
export const useSocket = () => useContext(SocketContext);
