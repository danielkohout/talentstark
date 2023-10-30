/*
  Warnings:

  - Added the required column `benefits` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `briefing` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speech` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Job` ADD COLUMN `benefits` VARCHAR(191) NOT NULL,
    ADD COLUMN `briefing` VARCHAR(191) NOT NULL,
    ADD COLUMN `mail` VARCHAR(191) NOT NULL,
    ADD COLUMN `speech` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
