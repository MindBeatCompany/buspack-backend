import {MigrationInterface, QueryRunner} from "typeorm";

export class changeCpaAccountLocalityTableToString1681239487126 implements MigrationInterface {
    name = 'changeCpaAccountLocalityTableToString1681239487126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `cp`");
        await queryRunner.query("ALTER TABLE `account_locality` ADD `cp` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `cp`");
        await queryRunner.query("ALTER TABLE `account_locality` ADD `cp` int NULL");
    }

}
