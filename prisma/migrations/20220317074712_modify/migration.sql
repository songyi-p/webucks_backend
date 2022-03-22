/*
  Warnings:

  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `allergies` MODIFY `name` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `categories` MODIFY `name` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `product_images` MODIFY `image_url` VARCHAR(3000) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `korean_name` VARCHAR(200) NOT NULL,
    MODIFY `english_name` VARCHAR(200) NOT NULL;
