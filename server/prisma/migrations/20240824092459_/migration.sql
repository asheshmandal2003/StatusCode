/*
  Warnings:

  - You are about to drop the column `dateofBirth` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "dateofBirth",
ADD COLUMN     "bloodBankName" TEXT,
ADD COLUMN     "hospitalName" TEXT,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "bloodGroup" DROP NOT NULL;
