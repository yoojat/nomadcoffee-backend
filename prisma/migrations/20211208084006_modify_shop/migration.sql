-- DropForeignKey
ALTER TABLE "CoffeeShopPhoto" DROP CONSTRAINT "CoffeeShopPhoto_coffeeShopId_fkey";

-- CreateTable
CREATE TABLE "_CoffeeShopToCoffeeShopPhoto" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeShopToCoffeeShopPhoto_AB_unique" ON "_CoffeeShopToCoffeeShopPhoto"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeShopToCoffeeShopPhoto_B_index" ON "_CoffeeShopToCoffeeShopPhoto"("B");

-- AddForeignKey
ALTER TABLE "_CoffeeShopToCoffeeShopPhoto" ADD FOREIGN KEY ("A") REFERENCES "CoffeeShop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeShopToCoffeeShopPhoto" ADD FOREIGN KEY ("B") REFERENCES "CoffeeShopPhoto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
