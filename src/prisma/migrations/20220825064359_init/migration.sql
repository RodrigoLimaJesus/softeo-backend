/*
  Warnings:

  - You are about to drop the column `cellNumber` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Installments` table. All the data in the column will be lost.
  - You are about to drop the column `itsPaid` on the `Installments` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDate` on the `Installments` table. All the data in the column will be lost.
  - Added the required column `cell_number` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `Installments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `its_paid` to the `Installments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_date` to the `Installments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Installments` DROP FOREIGN KEY `Installments_clientId_fkey`;

-- AlterTable
ALTER TABLE `Client` DROP COLUMN `cellNumber`,
    ADD COLUMN `cell_number` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Installments` DROP COLUMN `clientId`,
    DROP COLUMN `itsPaid`,
    DROP COLUMN `paymentDate`,
    ADD COLUMN `client_id` INTEGER NOT NULL,
    ADD COLUMN `its_paid` BOOLEAN NOT NULL,
    ADD COLUMN `payment_date` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Installments` ADD CONSTRAINT `Installments_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
