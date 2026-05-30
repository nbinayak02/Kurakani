/// <reference types="vite/client" />
import { useEffect, useState, type ReactNode } from "react";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import { SocketContext } from "./SocketContext";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const host = import.meta.env.VITE_SOCKET_HOST || "http://localhost:5000";

  useEffect(() => {
    if (!user?.token) return;

    const socketInstance = io(host, {
      auth: { token: user.token },
      withCredentials: true,
    });

    socketInstance.on("connect", () => {
      console.log("Connected to server!");
      setIsConnected(true);
    });

    socketInstance.on("connect_error", (err) => {
      console.log("Connection Error", err);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from the server!");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, [user?.token]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
