import {MigrationInterface, QueryRunner} from "typeorm";

export class addhasCustomPricingInAccountEntity1681997558731 implements MigrationInterface {
    name = 'addhasCustomPricingInAccountEntity1681997558731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `accounts` ADD `has_custom_pricing` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `accounts` DROP COLUMN `has_custom_pricing`");
    }

}
