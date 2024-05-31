import {MigrationInterface, QueryRunner} from "typeorm";

export class addLocalityProvinceCpColumnsToAccountLocalityTable1670880677371 implements MigrationInterface {
    name = 'addLocalityProvinceCpColumnsToAccountLocalityTable1670880677371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `account_locality` ADD `locality` varchar(255)");
        await queryRunner.query("ALTER TABLE `account_locality` ADD `province` varchar(255)");
        await queryRunner.query("ALTER TABLE `account_locality` ADD `cp` int");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `cp`");
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `province`");
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `locality`");
    }

}
