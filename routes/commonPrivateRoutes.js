import express from "express";
import { getUserQuestions,getSingleDiscussion,discussionReply } from "../controllers/questionController.js";
const router = express.Router();
router.post("/asked-questions", getUserQuestions);
router.post("/asked-questions/:id", getSingleDiscussion);
router.post("/reply", discussionReply);

export default router;
