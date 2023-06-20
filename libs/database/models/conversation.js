import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {timestamps: true}
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export {Conversation};