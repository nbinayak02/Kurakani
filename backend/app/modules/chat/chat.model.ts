import { Schema, model, type InferSchemaType } from "mongoose";

const chatSchema = new Schema(
  {
    message: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String },
    reactions: [
      {
        type: String,
        enum: ["like", "love", "haha", "sad", "angry", "none"],
        default: "none",
        reacted_by: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

export type TChat = InferSchemaType<typeof chatSchema>;
const Chat = model("Chat", chatSchema);

export default Chat;
