-- CreateTable
CREATE TABLE `Parcel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tracking_number` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `recipient_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Parcel_tracking_number_key`(`tracking_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
