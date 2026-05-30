import type { Socket } from "socket.io";
import { io } from "./app.js";
import { saveMessage } from "./chat/chat.controller.js";

io.on("connection", async (socket: Socket) => {
  console.log("Someone Connected");

  // join default group
  await socket.join("default");

  // broadcast active users count to all
  io.to("default").emit("activeUserCount", socket.data.currentlyActive);

  // handle sending message
  socket.on("sendMessage", async (message: string) => {
    const savedMessage = await saveMessage(socket.data.user, message);
    io.to("default").emit("recentMessage", savedMessage);
  });

  // handle typing
  socket.on("typing", (state) => {
    io.to("default").emit("typing", { state: state, by: socket.data.user });
  });
});
