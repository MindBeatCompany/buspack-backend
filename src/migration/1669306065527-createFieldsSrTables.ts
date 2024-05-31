import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesFieldsSR1669306065527 implements MigrationInterface {
    name = 'createTablesFieldsSR1669306065527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `field_boolean` (`id` int NOT NULL AUTO_INCREMENT, `field_name` varchar(30) NOT NULL, `required` tinyint NOT NULL, `position` tinyint NOT NULL, `default_value` tinyint, `format_sr_id` int NULL, UNIQUE INDEX `REL_f61eda80c46fde338e93f26075` (`format_sr_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `field_number` (`id` int NOT NULL AUTO_INCREMENT, `field_name` varchar(30) NOT NULL, `required` tinyint NOT NULL, `position` tinyint NOT NULL, `default_value` smallint, `format_sr_id` int NULL, UNIQUE INDEX `REL_1b212ceea1ca624b87367f227d` (`format_sr_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `field_string` (`id` int NOT NULL AUTO_INCREMENT, `field_name` varchar(30) NOT NULL, `required` tinyint NOT NULL, `position` tinyint NOT NULL, `length` smallint NOT NULL, `default_value` varchar(255), `format_sr_id` int NULL, UNIQUE INDEX `REL_8c8d5100e74e1075dcea183b23` (`format_sr_id`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `field_boolean` ADD CONSTRAINT `FK_f61eda80c46fde338e93f26075a` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `field_number` ADD CONSTRAINT `FK_1b212ceea1ca624b87367f227d9` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `field_string` ADD CONSTRAINT `FK_8c8d5100e74e1075dcea183b234` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `field_string` DROP FOREIGN KEY `FK_8c8d5100e74e1075dcea183b234`");
        await queryRunner.query("ALTER TABLE `field_number` DROP FOREIGN KEY `FK_1b212ceea1ca624b87367f227d9`");
        await queryRunner.query("ALTER TABLE `field_boolean` DROP FOREIGN KEY `FK_f61eda80c46fde338e93f26075a`");
        await queryRunner.query("DROP INDEX `REL_8c8d5100e74e1075dcea183b23` ON `field_string`");
        await queryRunner.query("DROP TABLE `field_string`");
        await queryRunner.query("DROP INDEX `REL_1b212ceea1ca624b87367f227d` ON `field_number`");
        await queryRunner.query("DROP TABLE `field_number`");
        await queryRunner.query("DROP INDEX `REL_f61eda80c46fde338e93f26075` ON `field_boolean`");
        await queryRunner.query("DROP TABLE `field_boolean`");
    }

}
