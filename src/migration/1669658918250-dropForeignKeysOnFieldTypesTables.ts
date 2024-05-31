import {MigrationInterface, QueryRunner} from "typeorm";

export class dropForeignKeysOnFieldTypesTables1669658918250 implements MigrationInterface {
    name = 'dropForeignKeysOnFieldTypesTables1669658918250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `field_boolean` DROP FOREIGN KEY `FK_f61eda80c46fde338e93f26075a`");
        await queryRunner.query("ALTER TABLE `field_number` DROP FOREIGN KEY `FK_1b212ceea1ca624b87367f227d9`");
        await queryRunner.query("ALTER TABLE `field_string` DROP FOREIGN KEY `FK_8c8d5100e74e1075dcea183b234`");
        await queryRunner.query("DROP INDEX `REL_f61eda80c46fde338e93f26075` ON `field_boolean`");
        await queryRunner.query("DROP INDEX `REL_1b212ceea1ca624b87367f227d` ON `field_number`");
        await queryRunner.query("DROP INDEX `REL_8c8d5100e74e1075dcea183b23` ON `field_string`");
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `format_sr_id` `account_id` int NULL");
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `format_sr_id` `account_id` int NULL");
        await queryRunner.query("ALTER TABLE `field_number` DROP COLUMN `format_sr_id`");
        await queryRunner.query("ALTER TABLE `field_number` ADD `account_id` smallint NOT NULL");
        await queryRunner.query("ALTER TABLE `field_boolean` DROP COLUMN `account_id`");
        await queryRunner.query("ALTER TABLE `field_boolean` ADD `account_id` smallint NOT NULL");
        await queryRunner.query("ALTER TABLE `field_number` CHANGE `default_value` `default_value` smallint NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `default_value` `default_value` varchar(255) NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `default_value` `default_value` tinyint NULL DEFAULT NULL");
        await queryRunner.query("ALTER TABLE `field_string` DROP COLUMN `account_id`");
        await queryRunner.query("ALTER TABLE `field_string` ADD `account_id` smallint NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `field_string` DROP COLUMN `account_id`");
        await queryRunner.query("ALTER TABLE `field_string` ADD `account_id` int NULL");
        await queryRunner.query("ALTER TABLE `field_number` CHANGE `default_value` `default_value` smallint NULL");
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `default_value` `default_value` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `default_value` `default_value` tinyint NULL");
        await queryRunner.query("ALTER TABLE `field_boolean` DROP COLUMN `account_id`");
        await queryRunner.query("ALTER TABLE `field_boolean` ADD `account_id` int NULL");
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `file_path` `file_path` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `field_number` DROP COLUMN `account_id`");
        await queryRunner.query("ALTER TABLE `field_number` ADD `format_sr_id` int NULL");
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `account_id` `format_sr_id` int NULL");
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `account_id` `format_sr_id` int NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_8c8d5100e74e1075dcea183b23` ON `field_string` (`format_sr_id`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_1b212ceea1ca624b87367f227d` ON `field_number` (`format_sr_id`)");
        await queryRunner.query("CREATE UNIQUE INDEX `REL_f61eda80c46fde338e93f26075` ON `field_boolean` (`format_sr_id`)");
        await queryRunner.query("ALTER TABLE `field_string` ADD CONSTRAINT `FK_8c8d5100e74e1075dcea183b234` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `field_number` ADD CONSTRAINT `FK_1b212ceea1ca624b87367f227d9` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `field_boolean` ADD CONSTRAINT `FK_f61eda80c46fde338e93f26075a` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
