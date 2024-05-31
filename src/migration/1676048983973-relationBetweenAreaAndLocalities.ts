import {MigrationInterface, QueryRunner} from "typeorm";

export class relationBetweenAreaAndLocalities1676048983973 implements MigrationInterface {
    name = 'relationBetweenAreaAndLocalities1676048983973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `areas_localities_locality` (`areasId` int NOT NULL, `localityIdlocality` int NOT NULL, INDEX `IDX_60cf615e36af5776bfdabe039c` (`areasId`), INDEX `IDX_9942b90312cd3089fdcbb39780` (`localityIdlocality`), PRIMARY KEY (`areasId`, `localityIdlocality`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `areas_localities_locality` ADD CONSTRAINT `FK_60cf615e36af5776bfdabe039cb` FOREIGN KEY (`areasId`) REFERENCES `areas`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `areas_localities_locality` ADD CONSTRAINT `FK_9942b90312cd3089fdcbb39780f` FOREIGN KEY (`localityIdlocality`) REFERENCES `locality`(`idlocality`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `areas_localities_locality` DROP FOREIGN KEY `FK_9942b90312cd3089fdcbb39780f`");
        await queryRunner.query("ALTER TABLE `areas_localities_locality` DROP FOREIGN KEY `FK_60cf615e36af5776bfdabe039cb`");
        await queryRunner.query("DROP TABLE `areas_localities_locality`");
    }

}
