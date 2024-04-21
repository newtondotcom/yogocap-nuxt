-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "stored" BOOLEAN NOT NULL,
    "submission" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN,
    "emojis" BOOLEAN NOT NULL,
    "music" BOOLEAN NOT NULL,
    "silent" BOOLEAN NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "user_id" TEXT NOT NULL,
    "videos_remaining" TEXT NOT NULL,
    "current_duration" TEXT NOT NULL,
    "can_emojis" BOOLEAN NOT NULL,
    "can_music" BOOLEAN NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Buyings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "plan" TEXT NOT NULL,

    CONSTRAINT "Buyings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "time_transcription" DOUBLE PRECISION,
    "aligned" BOOLEAN NOT NULL,
    "time_alignment" DOUBLE PRECISION,
    "time_encoding" DOUBLE PRECISION,
    "emojis" BOOLEAN NOT NULL,
    "music" BOOLEAN NOT NULL,
    "silent" BOOLEAN NOT NULL,
    "done_at" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
