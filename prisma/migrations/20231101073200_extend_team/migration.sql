/*
  Warnings:

  - You are about to drop the column `contact` on the `Team` table. All the data in the column will be lost.
  - Added the required column `contactFirstName` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactLastName` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Team` DROP COLUMN `contact`,
    ADD COLUMN `contactFirstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactLastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
