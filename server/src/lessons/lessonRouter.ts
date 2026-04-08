import { Router } from "express";
import { authenticate } from "../auth/authenticate";
import { completeTask, getLessonProgress, getAllProgress, resetLesson, resetAllLessonProgress, resetChapter } from "./lessonController";
import { getUnitManifest, getAllChapters } from "../manifests/manifestController";

const router = Router();

router.get("/chapters", getAllChapters);
router.get("/chapters/:chapterId/units/:unitId/manifest", getUnitManifest);


router.use(authenticate);

router.get("/progress", getAllProgress);
router.get("/chapters/:chapterId/units/:unitId/progress", getLessonProgress);
router.post("/chapters/:chapterId/units/:unitId/tasks/:taskId/complete", completeTask);
router.delete("/chapters/:chapterId/units/:unitId/progress", resetLesson);
router.delete("/chapters/:chapterId/progress", resetChapter);
router.delete("/progress", resetAllLessonProgress);

export default router;