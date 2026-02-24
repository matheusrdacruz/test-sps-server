-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT;

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
