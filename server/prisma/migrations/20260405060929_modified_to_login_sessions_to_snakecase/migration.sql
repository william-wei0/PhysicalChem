/*
  Warnings:

  - You are about to drop the `loginSessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "loginSessions" DROP CONSTRAINT "loginSessions_user_id_fkey";

-- DropTable
DROP TABLE "loginSessions";

-- CreateTable
CREATE TABLE "login_sessions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "login_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "login_sessions_refresh_token_key" ON "login_sessions"("refresh_token");

-- AddForeignKey
ALTER TABLE "login_sessions" ADD CONSTRAINT "login_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
