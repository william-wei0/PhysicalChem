import { prisma } from "../lib/prisma";
import AppError from "../errors/AppError";
import { getUnitTaskIds } from "./manifests/manifestService";

export const getLessonProgress = async (
  userId: number,
  chapterId: number,
  unitId: number,
) => {
  return prisma.lessonProgress.findMany({
    where: { userId, chapterId, unitId },
    select: { taskId: true, completedAt: true },
  });
};

export const completeTask = async (
  userId: number,
  chapterId: number,
  unitId: number,
  taskId: string,
) => {
  const validIds = getUnitTaskIds(chapterId, unitId);
  if (!validIds.includes(taskId)) {
    throw new AppError(`Unknown taskId: ${taskId}`, 400);
  }

  return prisma.lessonProgress.upsert({
    where: { userId_chapterId_unitId_taskId: { userId, chapterId, unitId, taskId } },
    update: {},
    create: { userId, chapterId, unitId, taskId },
  });
};

export const getAllProgress = async (userId: number) => {
  return prisma.lessonProgress.findMany({
    where: { userId },
    select: { taskId: true, chapterId: true, unitId: true, completedAt: true },
  });
};

export const resetLesson = async (
  userId: number,
  chapterId: number,
  unitId: number,
) => {
  const { count } = await prisma.lessonProgress.deleteMany({
    where: { userId, chapterId, unitId },
  });

  if (count === 0) {
    throw new AppError("No progress found for this lesson.", 404);
  }
};

export const resetChapter = async (
  userId: number,
  chapterId: number,
) => {
  const { count } = await prisma.lessonProgress.deleteMany({
    where: { userId, chapterId },
  });

  if (count === 0) {
    throw new AppError("No progress found for this chapter.", 404);
  }
};

export const resetAllLessonProgress = async (
  userId: number,
) => {
  await prisma.lessonProgress.deleteMany({
    where: { userId },
  });
};