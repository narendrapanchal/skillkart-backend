import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Example: "Web Development Basics"
  skill: { type: String, required: true }, // Example: "Web Development"
  weeks: [
    {
      weekNumber: Number,
      topics: [
        {
          title: String,
          description: String,
          resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }]
        }
      ]
    }
  ],
}, { timestamps: true, versionKey:false });

export default mongoose.model("Roadmap", roadmapSchema);
