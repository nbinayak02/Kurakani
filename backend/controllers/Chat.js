const Message = require("../models/Message");

async function getLastMessages(req, res) {
  try {
    const last20Msg = await Message.find({})
      .populate("username", "username")
      .sort({ createdAt: -1 })
      .limit(20);
    return res
      .status(200)
      .json({ message: "Fetched last 20 messages!", data: last20Msg });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong!" });

  }
}

module.exports = {
  getLastMessages,
};
