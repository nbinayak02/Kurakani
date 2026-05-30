import type { Types } from "mongoose";
import Chat from "./chat.model.js";

async function saveMessage(senderId: Types.ObjectId, message: string) {
  const savedMessage = await Chat.create({
    sender: senderId,
    message,
  });

  await savedMessage.populate("sender");
  return savedMessage;
}

async function getMessages() {
  const messages = await Chat.find({})
    .populate("sender")
    .sort({ createdAt: -1 })
    .limit(10)
    .sort({ createdAt: 1 });

  return messages;
}

export { saveMessage, getMessages };
