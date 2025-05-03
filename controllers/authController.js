import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Skill from "../models/Skill.js";

export const register = async (req, res) => {
  const { name, email, password, role = "learner", interest, goal, weeklyTime } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      interest,
      goal,
      weeklyTime
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("error--", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    const skill=await Skill.findById(user.interest);
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    user={...user._doc,password:undefined};
    res.status(200).json({ token, ...user, skillName:skill.skill });
  } catch (error) {
    console.log("error---",error)
    res.status(500).json({ message: "Server error" });
  }
};
