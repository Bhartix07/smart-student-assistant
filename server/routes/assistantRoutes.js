import express from "express";
import { chatAssistant, createStudyPlan, getTopics } from "../controllers/assistantController.js";

const router = express.Router();

router.get("/topics", getTopics);
router.post("/chat", chatAssistant);
router.post("/plan", createStudyPlan);

export default router;
