/*
  Warnings:

  - You are about to drop the column `user_by` on the `Code` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Code" DROP COLUMN "user_by",
ADD COLUMN     "used_by" TEXT;
