-- AlterTable
ALTER TABLE `Application` ADD COLUMN `teamId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
