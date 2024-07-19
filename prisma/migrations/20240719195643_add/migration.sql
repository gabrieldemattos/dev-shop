/*
  Warnings:

  - Added the required column `addressCity` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressCountry` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressFirstName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressLabel` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressLastName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressNeighborhood` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressPostalCode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressState` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressStreet` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressTelephoneDDD` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressTelephoneNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PIX', 'DEBIT_CARD', 'CREDIT_CARD', 'CASH');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressCity" TEXT NOT NULL,
ADD COLUMN     "addressComplement" TEXT,
ADD COLUMN     "addressCountry" "Country" NOT NULL,
ADD COLUMN     "addressFirstName" TEXT NOT NULL,
ADD COLUMN     "addressLabel" TEXT NOT NULL,
ADD COLUMN     "addressLastName" TEXT NOT NULL,
ADD COLUMN     "addressNeighborhood" TEXT NOT NULL,
ADD COLUMN     "addressNumber" TEXT NOT NULL,
ADD COLUMN     "addressPostalCode" TEXT NOT NULL,
ADD COLUMN     "addressReference" TEXT,
ADD COLUMN     "addressState" "State" NOT NULL,
ADD COLUMN     "addressStreet" TEXT NOT NULL,
ADD COLUMN     "addressTelephoneDDD" VARCHAR(2) NOT NULL,
ADD COLUMN     "addressTelephoneNumber" VARCHAR(9) NOT NULL,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL;
