/*
  Warnings:

  - Changed the type of `videos_remaining` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `current_duration` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `videos_stored` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "videos_remaining",
ADD COLUMN     "videos_remaining" INTEGER NOT NULL,
DROP COLUMN "current_duration",
ADD COLUMN     "current_duration" INTEGER NOT NULL,
DROP COLUMN "videos_stored",
ADD COLUMN     "videos_stored" INTEGER NOT NULL;
