import express from "express";
import { createSkill, addStep,addBadge } from "../controllers/adminController.js";

const router = express.Router();

router.post("/add-skill", createSkill);
router.post("/add-step/:skill", addStep);
router.post("/add-badge", addBadge);


export default router;
