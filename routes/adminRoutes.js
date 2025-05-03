import express from "express";
import { createSkill, uploadResource, createRoadmap, addStep } from "../controllers/adminController.js";

const router = express.Router();

router.post("/add-skill", createSkill);
router.post("/upload-resource", uploadResource);
router.post("/create-roadmap", createRoadmap);
router.post("/add-step/:skill", addStep);

export default router;
