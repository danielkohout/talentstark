/*
  Warnings:

  - You are about to drop the `UserJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserJob` DROP FOREIGN KEY `UserJob_jobId_fkey`;

-- DropForeignKey
ALTER TABLE `UserJob` DROP FOREIGN KEY `UserJob_userId_fkey`;

-- DropIndex
DROP INDEX `Job_userId_fkey` ON `Job`;

-- DropTable
DROP TABLE `UserJob`;
