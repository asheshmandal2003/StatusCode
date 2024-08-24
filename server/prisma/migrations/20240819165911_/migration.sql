/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DONOR', 'HOSPITAL', 'BLOOD_BANK', 'ADMIN');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'DONOR';

-- DropEnum
DROP TYPE "role";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "avatar_public_id" TEXT NOT NULL,
    "phoneNo" BIGINT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
