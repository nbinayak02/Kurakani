const Message = require("../models/Message");

async function saveMessage(user, message) {
  try {
    const createdMsg = await Message.create({
      username: user,
      message: message,
    });

    await createdMsg.populate("username", "username");
    return { createdMsg };
  } catch (error) {
    return { status: "ERROR" };
  }
}

module.exports = {
  saveMessage,
};
