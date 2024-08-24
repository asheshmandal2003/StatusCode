/*
  Warnings:

  - You are about to drop the column `hospitalProfileId` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the `HospitalProfile` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `profileId` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_hospitalProfileId_fkey";

-- DropForeignKey
ALTER TABLE "HospitalProfile" DROP CONSTRAINT "HospitalProfile_userId_fkey";

-- DropIndex
DROP INDEX "Address_hospitalProfileId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "hospitalProfileId",
ALTER COLUMN "profileId" SET NOT NULL;

-- DropTable
DROP TABLE "HospitalProfile";
