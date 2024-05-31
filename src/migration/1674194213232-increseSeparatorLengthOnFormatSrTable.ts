import {MigrationInterface, QueryRunner} from "typeorm";

export class increseSeparatorLengthOnFormatSrTable1674194213232 implements MigrationInterface {
    name = 'increseSeparatorLengthOnFormatSrTable1674194213232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `format_sr` DROP COLUMN `separator`");
        await queryRunner.query("ALTER TABLE `format_sr` ADD `separator` varchar(11) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `format_sr` DROP COLUMN `separator`");
        await queryRunner.query("ALTER TABLE `format_sr` ADD `separator` varchar(9) NULL");
    }

}
