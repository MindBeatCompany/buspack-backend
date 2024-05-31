import {MigrationInterface, QueryRunner} from "typeorm";

export class filePathNotNull1669032135538 implements MigrationInterface {
    name = 'filePathNotNull1669032135538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `file_path` `file_path` varchar(255) NULL DEFAULT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `file_path` `file_path` varchar(255) NULL");
    }

}
