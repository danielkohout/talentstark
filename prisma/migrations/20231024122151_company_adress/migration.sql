/*
  Warnings:

  - Added the required column `city` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCode` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Company` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `postCode` INTEGER NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;
