import {MigrationInterface, QueryRunner} from "typeorm";

export class positonAcceptNullOnStringNumberAndBooleanTables1674596999540 implements MigrationInterface {
    name = 'positonAcceptNullOnStringNumberAndBooleanTables1674596999540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `position` `position` tinyint NULL");
        await queryRunner.query("ALTER TABLE `field_number` CHANGE `position` `position` tinyint NULL");
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `position` `position` tinyint NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `position` `position` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `field_number` CHANGE `position` `position` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `position` `position` tinyint NOT NULL");
    }

}
