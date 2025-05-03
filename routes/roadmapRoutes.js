import express from "express";
import { getUserRoadmap, markStepCompleted } from "../controllers/roadmapController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/my-roadmap", protect("learner"), getUserRoadmap);
router.post("/mark-completed", protect("learner"), markStepCompleted);

export default router;
