import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableFormatSR1669299630069 implements MigrationInterface {
    name = 'createTableFormatSR1669299630069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `format_sr` (`id` int NOT NULL AUTO_INCREMENT, `format` varchar(3) NOT NULL, `separator` varchar(9), `account_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `format_sr`");
    }
}
