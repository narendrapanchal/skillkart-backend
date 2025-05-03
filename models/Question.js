
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
      },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey:false }
);

export default mongoose.model("Question", questionSchema);
