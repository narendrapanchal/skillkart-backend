import Resource from "../models/Resource.js";
import Roadmap from "../models/Roadmap.js";
import Skill from "../models/Skill.js";
import Step from "../models/Step.js"; // Make sure path is correct

export const createSkill = async (req, res) => {
  const { skill, userId } = req.body;
  try {
    console.log("skills",skill, userId)
    const newSkill = await Skill.create({ skill, userId });
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadResource = async (req, res) => {
  const { title, type, link, skill } = req.body;
  try {
    const newResource = await Resource.create({ title, type, link, skill });
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createRoadmap = async (req, res) => {
  const { title, skill, weeks } = req.body;
  try {
    console.log("title, skill")
    const newRoadmap = await Roadmap.create({ title, skill, weeks });
    res.status(201).json(newRoadmap);
  } catch (error) {
    console.log("error createRoadmap----",error)
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoadmapByLearnerId = async (req, res) => {
  const { skill } = req.params;
  try {
    const roadmap = await Roadmap.findOne({ skill }).populate("weeks.topics.resources");
    res.status(200).json(roadmap);
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

