import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export default mongoose.model("Card", cardSchema);
