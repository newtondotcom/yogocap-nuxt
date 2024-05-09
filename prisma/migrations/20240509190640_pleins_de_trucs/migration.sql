/*
  Warnings:

  - Added the required column `onjoin` to the `Buyings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buyings" ADD COLUMN     "onjoin" BOOLEAN NOT NULL;
