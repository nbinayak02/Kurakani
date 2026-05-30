import { Schema, model } from "mongoose";

const ActiveNowSchema = new Schema(
  {
    currentlyActive: {
      type: Number,
      required: true,
      default: 0,
    },
    room: {
      type: String,
      default: "default",
    },
  },
  { timestamps: true },
);

const ActiveNow = model("activeNow", ActiveNowSchema);
export default ActiveNow
