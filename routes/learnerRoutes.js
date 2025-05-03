import express from "express";
import { getUserRoadmap, markStepCompleted } from "../controllers/roadmapController.js";
import {
    createQuestion,
  } from "../controllers/questionController.js";
const router = express.Router();

router.post("/my-roadmap", getUserRoadmap);
router.post("/mark-step", markStepCompleted);
router.post("/ask-question", createQuestion);

export default router;
