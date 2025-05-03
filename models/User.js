import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // Common fields
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Role based access
  role: {
    type: String,
    enum: ["learner", "admin"],
    default: "learner",
  },
  xp:{
    type:Number,
    default:0
  },
  // Learner specific onboarding
  interest: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  }, 

  goal: {
    type: String,
    required: function () { return this.role === "learner"; },
  },

  weeklyTime: {
    type: Number,
    enum: [10, 20, 30, 40],
    required: function () { return this.role === "learner"; }
  },

  // Learner progress
  badges: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Badge"
  },

  completedSteps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Step" }],
}, { timestamps: true, versionKey:false });

export default mongoose.model("User", userSchema);
