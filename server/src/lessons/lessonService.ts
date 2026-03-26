import { prisma } from "../lib/prisma";
import AppError from "../errors/AppError";

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
  return prisma.lessonProgress.upsert({
    where: {
      userId_chapterId_unitId_taskId: { userId, chapterId, unitId, taskId },
    },
    update: {},
    create: { userId, chapterId, unitId, taskId },
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