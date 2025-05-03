import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["video", "blog", "quiz"], required: true },
  link: { type: String, required: true },
  skill: { type: String, required: true },
}, { timestamps: true, versionKey:false });

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
