import { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";

type SocketType = {
  socket: Socket | null;
  isConnected: boolean;
};

export const SocketContext = createContext<SocketType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
