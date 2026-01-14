/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `telegramId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "telegramId",
ADD COLUMN     "telegramId" BIGINT NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT NOW(),
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("telegramId");
