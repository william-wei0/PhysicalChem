import { Router } from "express";
import { authenticate } from "../auth/authenticate";
import { completeTask, getLessonProgress, resetLesson } from "./lessonController";

const router = Router();

router.use(authenticate);

router.get("/chapters/:chapterId/units/:unitId/progress", getLessonProgress);
router.post("/chapters/:chapterId/units/:unitId/tasks/:taskId/complete", completeTask);
router.delete("/chapters/:chapterId/units/:unitId/progress", resetLesson);

export default router;