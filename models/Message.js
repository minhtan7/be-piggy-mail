const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchem = Schema(
  {
    from: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    to: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["seen", "unseen"],
    },
    isDelete: false,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchem);

module.exports = Message;
