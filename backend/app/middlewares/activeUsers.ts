import type { Socket } from "socket.io";
import ActiveNow from "../chat/activenow.model.js";

async function incrementActiveUsers(socket: Socket, next: () => void) {
  const activeLog = await ActiveNow.find({ room: "default" });
  const updatedValue = await ActiveNow.findOneAndUpdate(
    { _id: activeLog[0]?._id },
    { $inc: { currentlyActive: 1 } },
    { upsert: true, new: true },
  );

  socket.data.currentlyActive = updatedValue?.currentlyActive;
  next();
}

async function decrementActiveUsers() {
  const activeLog = await ActiveNow.find();
  const updatedValue = await ActiveNow.findOneAndUpdate(
    { _id: activeLog[0]?._id },
    { $inc: { currentlyActive: -1 } },
    { new: true },
  );
  return updatedValue?.currentlyActive;
}

export { incrementActiveUsers, decrementActiveUsers };
