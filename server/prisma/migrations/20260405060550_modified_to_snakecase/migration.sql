/*
  Warnings:

  - You are about to drop the column `createdAt` on the `groups` table. All the data in the column will be lost.
  - You are about to drop the column `chapterId` on the `lesson_progress` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `lesson_progress` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `lesson_progress` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `lesson_progress` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `lesson_progress` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `loginSessions` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `loginSessions` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `loginSessions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `loginSessions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `roles` table. All the data in the column will be lost.
  - The primary key for the `user_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `groupId` on the `user_groups` table. All the data in the column will be lost.
  - You are about to drop the column `joinedAt` on the `user_groups` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_groups` table. All the data in the column will be lost.
  - The primary key for the `user_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assignedAt` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `user_roles` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordExpires` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,chapter_id,unit_id,task_id]` on the table `lesson_progress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refresh_token]` on the table `loginSessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chapter_id` to the `lesson_progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task_id` to the `lesson_progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_id` to the `lesson_progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `lesson_progress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `loginSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `loginSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `loginSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group_id` to the `user_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `user_roles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lesson_progress" DROP CONSTRAINT "lesson_progress_userId_fkey";

-- DropForeignKey
ALTER TABLE "loginSessions" DROP CONSTRAINT "loginSessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_groups" DROP CONSTRAINT "user_groups_groupId_fkey";

-- DropForeignKey
ALTER TABLE "user_groups" DROP CONSTRAINT "user_groups_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_userId_fkey";

-- DropIndex
DROP INDEX "lesson_progress_userId_chapterId_unitId_taskId_key";

-- DropIndex
DROP INDEX "loginSessions_refreshToken_key";

-- AlterTable
ALTER TABLE "groups" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "lesson_progress" DROP COLUMN "chapterId",
DROP COLUMN "completedAt",
DROP COLUMN "taskId",
DROP COLUMN "unitId",
DROP COLUMN "userId",
ADD COLUMN     "chapter_id" INTEGER NOT NULL,
ADD COLUMN     "completed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "task_id" TEXT NOT NULL,
ADD COLUMN     "unit_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "loginSessions" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "refreshToken",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_groups" DROP CONSTRAINT "user_groups_pkey",
DROP COLUMN "groupId",
DROP COLUMN "joinedAt",
DROP COLUMN "userId",
ADD COLUMN     "group_id" INTEGER NOT NULL,
ADD COLUMN     "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "user_groups_pkey" PRIMARY KEY ("user_id", "group_id");

-- AlterTable
ALTER TABLE "user_roles" DROP CONSTRAINT "user_roles_pkey",
DROP COLUMN "assignedAt",
DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "role_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "user_roles_pkey" PRIMARY KEY ("user_id", "role_id");

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "passwordHash",
DROP COLUMN "resetPasswordExpires",
DROP COLUMN "resetPasswordToken",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL,
ADD COLUMN     "reset_password_expires" TIMESTAMP(3),
ADD COLUMN     "reset_password_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "lesson_progress_user_id_chapter_id_unit_id_task_id_key" ON "lesson_progress"("user_id", "chapter_id", "unit_id", "task_id");

-- CreateIndex
CREATE UNIQUE INDEX "loginSessions_refresh_token_key" ON "loginSessions"("refresh_token");

-- AddForeignKey
ALTER TABLE "loginSessions" ADD CONSTRAINT "loginSessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
