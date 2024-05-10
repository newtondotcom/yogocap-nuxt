/*
  Warnings:

  - The primary key for the `S3` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `S3` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "S3" DROP CONSTRAINT "S3_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "S3_pkey" PRIMARY KEY ("name");
