/*
  Warnings:

  - You are about to drop the column `lessonId` on the `lesson_progress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,chapterId,unitId,taskId]` on the table `lesson_progress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chapterId` to the `lesson_progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `lesson_progress` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "lesson_progress_userId_lessonId_taskId_key";

-- AlterTable
ALTER TABLE "lesson_progress" DROP COLUMN "lessonId",
ADD COLUMN     "chapterId" INTEGER NOT NULL,
ADD COLUMN     "unitId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lesson_progress_userId_chapterId_unitId_taskId_key" ON "lesson_progress"("userId", "chapterId", "unitId", "taskId");
