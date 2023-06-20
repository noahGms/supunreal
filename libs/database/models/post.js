import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    location: String,
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);

export {Post};