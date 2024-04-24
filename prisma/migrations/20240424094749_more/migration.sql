/*
  Warnings:

  - You are about to drop the column `submission` on the `Video` table. All the data in the column will be lost.
  - Added the required column `videos_stored` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_id` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_s3` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submitted` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "videos_stored" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "video_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "submission",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name_s3" TEXT NOT NULL,
ADD COLUMN     "submitted" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "task_id" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ALTER COLUMN "stored" SET DATA TYPE TEXT;
