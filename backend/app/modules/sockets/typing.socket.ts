import type { Socket, Server } from "socket.io";
import type { TypingPayload } from "../../types/socket.types.js";

export const typingEvents = (socket: Socket, io: Server) => {
  socket.on("emitTyping", (typing: TypingPayload) => {
    socket.to("default").emit("typing", typing);
  });
};
