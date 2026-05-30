import type { Socket } from "socket.io";
import ActiveNow from "../modules/chat/activenow.model.js";

async function incrementActiveUsers() {
  const activeLog = await ActiveNow.find({ room: "default" });
  const updatedValue = await ActiveNow.findOneAndUpdate(
    { _id: activeLog[0]?._id },
    { $inc: { currentlyActive: 1 } },
    { upsert: true, returnDocument: "after" },
  );

  return updatedValue.currentlyActive
}

async function decrementActiveUsers() {
  const activeLog = await ActiveNow.find();
  const updatedValue = await ActiveNow.findOneAndUpdate(
    { _id: activeLog[0]?._id },
    { $inc: { currentlyActive: -1 } },
    { returnDocument: "after" },
  );
  return updatedValue?.currentlyActive;
}

export { incrementActiveUsers, decrementActiveUsers };
