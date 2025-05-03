import express from "express";
import { getSkills } from "../controllers/publicController.js";

const router = express.Router();

router.get("/skills", getSkills);

export default router;
