import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["video", "blog", "quiz"], required: true },
  link: { type: String, required: true },
  timeToComplete: { type: Number, required: true },
  stepNumber: { type: Number, required: true },
  skill: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true, versionKey: false });

export default mongoose.model("Step", stepSchema);
