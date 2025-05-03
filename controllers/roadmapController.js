import User from "../models/User.js";
import Step from "../models/Step.js";
const stepTypeXP = {
  video: 10,
  blog: 5,
  quiz: 20
};
export const getUserRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user || !user.interest ) {
      return res.status(404).json({ message: "User interest not set or skill not found" });
    }

    const skillId = user.interest;

    // 2. Get all steps related to that skill
    const steps = await Step.find({ skill: skillId }).sort({ stepNumber: 1 });

    // 3. Return steps
    res.status(200).json({ steps });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const markStepCompleted = async (req, res) => {
  const { stepId, userId ,type} = req.body;

  if (!stepId) {
    return res.status(400).json({ message: "Step ID is required" });
  }

  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const stepIdStr = stepId.toString();

    // Prevent duplicate entry
    user.xp=(user?.xp ? user.xp:0)+ stepTypeXP[type]
    if(!user.completedSteps.includes(stepIdStr)) {
      user.completedSteps.push(stepIdStr);
      await user.save();
    }
    
    user={...user._doc,password:undefined};
    res.status(200).json(user);
  } catch (error) {
    console.error("Error marking step as completed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

