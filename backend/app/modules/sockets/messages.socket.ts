import type { Socket, Server } from "socket.io";
import { getMessages, saveMessage } from "../chat/chat.controller.js";
import type { SendMessagePayload } from "../../types/socket.types.js";

export const messageEvents = (socket: Socket, io: Server) => {
  socket.on("lastMessages", async (callback) => {
    const messages = await getMessages();
    callback(messages);
  });

  socket.on(
    "sendMessage",
    async (data: SendMessagePayload, response: (success: boolean) => void) => {
      try {
        const savedMessage = await saveMessage(data.senderId, data.message);
        io.to("default").emit("recentMessage", savedMessage);
        response(true);
      } catch (error) {
        response(false);
        console.log(error);
      }
    },
  );
};
