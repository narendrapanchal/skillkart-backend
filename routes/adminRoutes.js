import express from "express";
import { createSkill, addStep } from "../controllers/adminController.js";

const router = express.Router();

router.post("/add-skill", createSkill);
router.post("/add-step/:skill", addStep);

export default router;
