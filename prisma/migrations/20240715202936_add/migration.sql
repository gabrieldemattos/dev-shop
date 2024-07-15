/*
  Warnings:

  - You are about to drop the column `telephone` on the `Address` table. All the data in the column will be lost.
  - Added the required column `telephoneDDD` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephoneNumber` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "telephone",
ADD COLUMN     "telephoneDDD" VARCHAR(2) NOT NULL,
ADD COLUMN     "telephoneNumber" VARCHAR(9) NOT NULL;
