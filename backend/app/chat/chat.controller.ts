import Chat from "./chat.model.js";

async function saveMessage(senderId: string, message: string) {
  const savedMessage = await Chat.create({
    sender: senderId,
    message,
  });

  await savedMessage.populate("sender");
  return savedMessage;
}

export { saveMessage };
