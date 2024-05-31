import {MigrationInterface, QueryRunner} from "typeorm";

export class addAccountLocalityTable1670860485699 implements MigrationInterface {
    name = 'addAccountLocalityTable1670860485699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `account_locality` (`id` int NOT NULL AUTO_INCREMENT, `account_id` smallint NOT NULL, `enabled_place_id` smallint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `account_locality`");
    }

}
