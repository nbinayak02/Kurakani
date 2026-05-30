import { io } from "./app.js";
import type { Socket } from "socket.io";
import { updateUser, userEvent } from "./modules/sockets/users.socket.js";
import { typingEvents } from "./modules/sockets/typing.socket.js";
import { messageEvents } from "./modules/sockets/messages.socket.js";

io.on("connection", async (socket: Socket) => {
  console.log("Someone Connected");
  await socket.join("default");
  updateUser(io, "inc");
  messageEvents(socket, io);
  typingEvents(socket, io);
  userEvent(socket, io);
});

io.on("disconnect", async (socket: Socket) => {
  console.log("Someone Disconnected");
  updateUser(io, "dec");
});
