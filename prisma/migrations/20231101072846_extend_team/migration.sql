/*
  Warnings:

  - Added the required column `city` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCode` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Team` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `contact` VARCHAR(191) NOT NULL,
    ADD COLUMN `postCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;
