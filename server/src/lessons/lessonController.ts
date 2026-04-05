import { Request, Response, NextFunction } from "express";
import * as lessonService from "./lessonService";
import AppError from "../errors/AppError";

type ChapterParams = { chapterId: string };
type UnitParams = { chapterId: string; unitId: string };
type TaskParams = { chapterId: string; unitId: string; taskId: string };

const parseUnitParams = (params: UnitParams) => {
  const chapterId = parseInt(params.chapterId);
  const unitId = parseInt(params.unitId);

  if (isNaN(chapterId) || isNaN(unitId)) {
    throw new AppError("Invalid chapter or unit ID.", 400);
  }

  return { chapterId, unitId };
};

export const getLessonProgress = async (req: Request<UnitParams>, res: Response, next: NextFunction) => {
  try {
    const { chapterId, unitId } = parseUnitParams(req.params);
    const progress = await lessonService.getLessonProgress(req.userId!, chapterId, unitId);
    return res.status(200).json({ progress });
  } catch (error) {
    next(error);
  }
};

export const completeTask = async (req: Request<TaskParams>, res: Response, next: NextFunction) => {
  try {
    const { chapterId, unitId } = parseUnitParams(req.params);
    const { taskId } = req.params;
    const progress = await lessonService.completeTask(req.userId!, chapterId, unitId, taskId);
    return res.status(200).json({ progress });
  } catch (error) {
    next(error);
  }
};

export const getAllProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const progress = await lessonService.getAllProgress(req.userId!);
    return res.status(200).json({ progress });
  } catch (error) {
    next(error);
  }
};

export const resetLesson = async (req: Request<UnitParams>, res: Response, next: NextFunction) => {
  try {
    const { chapterId, unitId } = parseUnitParams(req.params);
    await lessonService.resetLesson(req.userId!, chapterId, unitId);
    return res.status(200).json({ message: "Lesson progress reset." });
  } catch (error) {
    next(error);
  }
};

export const resetChapter = async (req: Request<ChapterParams>, res: Response, next: NextFunction) => {
  try {
    const chapterId = parseInt(req.params.chapterId);
    if (isNaN(chapterId)) throw new AppError("Invalid chapter ID.", 400);
    await lessonService.resetChapter(req.userId!, chapterId);
    return res.status(200).json({ message: "Chapter progress reset." });
  } catch (error) {
    next(error);
  }
};

export const resetAllLessonProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await lessonService.resetAllLessonProgress(req.userId!);
    return res.status(200).json({ message: "All Lesson Progress reset." });
  } catch (error) {
    next(error);
  }
};
