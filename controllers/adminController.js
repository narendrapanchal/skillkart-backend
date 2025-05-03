import Skill from "../models/Skill.js";
import Step from "../models/Step.js"; // Make sure path is correct

export const createSkill = async (req, res) => {
  const { skill, userId } = req.body;
  try {
    const newSkill = await Skill.create({ skill, userId });
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const addStep = async (req, res) => {
  const { title, type, link, time, skill } = req.body;
  const userId = req.body.userId || req.body.id; // added by middleware

  try {
    // 1. Check if the skill exists
    const skillExists = await Skill.findById(skill);
    if (!skillExists) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // 2. Count existing steps for the specific skill
    const stepCount = await Step.countDocuments({ skill });

    // 3. Create the new step
    const newStep = await Step.create({
      title,
      type,
      link,
      timeToComplete: Number(time),
      stepNumber: stepCount + 1, // step number specific to the skill
      skill,
      createdBy: userId,
    });

    // 4. Respond with the new step
    res.status(201).json({
      message: "Step added successfully",
      step: newStep,
    });

  } catch (error) {
    console.error("Add Step Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

