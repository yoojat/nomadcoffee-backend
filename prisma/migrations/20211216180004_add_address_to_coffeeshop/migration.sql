/*
  Warnings:

  - Added the required column `address` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" ADD COLUMN     "address" TEXT NOT NULL;
