/*
  Warnings:

  - You are about to drop the column `user_id` on the `Document` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_user_id_fkey";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
