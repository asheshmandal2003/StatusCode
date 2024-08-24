/*
  Warnings:

  - A unique constraint covering the columns `[hospitalProfileId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hospitalProfileId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "hospitalProfileId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "HospitalProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "avatar_public_id" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HospitalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HospitalProfile_userId_key" ON "HospitalProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_hospitalProfileId_key" ON "Address"("hospitalProfileId");

-- AddForeignKey
ALTER TABLE "HospitalProfile" ADD CONSTRAINT "HospitalProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_hospitalProfileId_fkey" FOREIGN KEY ("hospitalProfileId") REFERENCES "HospitalProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
