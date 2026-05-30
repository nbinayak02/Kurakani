import type { Socket, Server } from "socket.io";
import { getActiveUsers, getTotalUsers } from "../user/user.controller.js";
import {
  decrementActiveUsers,
  incrementActiveUsers,
} from "../../middlewares/activeUsers.js";

export const userEvent = (socket: Socket, io: Server) => {
  socket.on("totalUserCount", async (callback) => {
    const totalUsers = await getTotalUsers();
    callback(totalUsers);
    socket.emit("totalUserCount", totalUsers);
  });

  socket.on("activeUserCount", async (callback) => {
    const activeUsers = await getActiveUsers();
    callback(activeUsers);
    socket.emit("activeUserCount", activeUsers);
  });
};

export const updateUser = async (io: Server, type: "inc" | "dec") => {
  let users;

  if (type === "inc") {
    users = await incrementActiveUsers();
  }

  if (type === "dec") {
    users = await decrementActiveUsers();
  }

  io.to("default").emit("activeUserCount", users);
};
