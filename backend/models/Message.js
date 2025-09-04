const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    username: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model("message", MessageSchema);
module.exports = Message;
