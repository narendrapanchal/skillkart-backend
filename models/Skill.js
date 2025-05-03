import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  skill: { type: String, required: true },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 👈 this is the reference to the User model
    required: true
  }
}, { timestamps: true, versionKey: false });

export default mongoose.model("Skill", skillSchema);
