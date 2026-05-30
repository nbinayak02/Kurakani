/// <reference types="vite/client" />
import { useEffect, useState, useRef, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const tokenReference = useRef<string | null>(null);

  const host = import.meta.env.VITE_SOCKET_HOST || "http://localhost:5000";

  useEffect(() => {
    // if token not available, don't connect
    if (!user?.token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setIsConnected(false);
      }
      tokenReference.current = null;
      return;
    }

    // if token and socket already available then return
    if (tokenReference.current === user.token && socketRef.current) return;

    // else create new instance
    const socketInstance = io(host, {
      auth: { token: user.token },
      withCredentials: true,
    });

    socketInstance.on("connect", () => setIsConnected(true));
    socketInstance.on("disconnect", () => setIsConnected(false));

    socketRef.current = socketInstance;
    setSocket(socketInstance);
    tokenReference.current = user.token;

    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, [host, user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
