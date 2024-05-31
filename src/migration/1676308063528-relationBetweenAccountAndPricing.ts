import {MigrationInterface, QueryRunner} from "typeorm";

export class relationBetweenAccountAndPricing1676308063528 implements MigrationInterface {
    name = 'relationBetweenAccountAndPricing1676308063528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pricings` ADD `account_id` int NULL");
        await queryRunner.query("ALTER TABLE `pricings` ADD CONSTRAINT `FK_6150d880fa40c618967814ac55d` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `pricings` DROP FOREIGN KEY `FK_6150d880fa40c618967814ac55d`");
        await queryRunner.query("ALTER TABLE `pricings` DROP COLUMN `account_id`");
    }

}
