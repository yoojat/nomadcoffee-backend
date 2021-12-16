/*
  Warnings:

  - Added the required column `caption` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" ADD COLUMN     "caption" TEXT NOT NULL;
