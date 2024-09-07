-- CreateTable
CREATE TABLE "Code" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "user_by" TEXT NOT NULL,
    "used_at" TIMESTAMP(3),

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);
