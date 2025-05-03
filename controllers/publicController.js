import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(201).json(skills);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
