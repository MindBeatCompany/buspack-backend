import {MigrationInterface, QueryRunner} from "typeorm";

export class addQuoteCharColumnToFormatSrTable1675112092520 implements MigrationInterface {
    name = 'addQuoteCharColumnToFormatSrTable1675112092520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `format_sr` ADD `quote_char` varchar(1) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `format_sr` DROP COLUMN `quote_char`");
    }

}
