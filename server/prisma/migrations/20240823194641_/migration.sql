/*
  Warnings:

  - You are about to drop the column `address` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "address";

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_profileId_key" ON "Address"("profileId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
