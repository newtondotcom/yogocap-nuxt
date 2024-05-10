-- CreateTable
CREATE TABLE "S3" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "ssl" BOOLEAN NOT NULL,
    "port" INTEGER NOT NULL,
    "access_key" TEXT NOT NULL,
    "secret_key" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "S3_pkey" PRIMARY KEY ("id")
);
