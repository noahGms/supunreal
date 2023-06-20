import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
  },
  {timestamps: true}
);

const File = mongoose.model("File", fileSchema);

export {File};