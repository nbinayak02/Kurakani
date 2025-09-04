const { Schema, model } = require("mongoose");

const ActiveNowSchema = new Schema(
  {
    currentlyActive: {
      type: Number,
      required: true,
      default: 0,
    },
    room: {
      type: String,
      default: "defaultGroup",
    },
  },
  { timestamps: true }
);

const ActiveNow = model("activeNow", ActiveNowSchema);
module.exports = ActiveNow;
