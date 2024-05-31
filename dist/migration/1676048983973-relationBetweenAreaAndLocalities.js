"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationBetweenAreaAndLocalities1676048983973 = void 0;
class relationBetweenAreaAndLocalities1676048983973 {
    constructor() {
        this.name = 'relationBetweenAreaAndLocalities1676048983973';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `areas_localities_locality` (`areasId` int NOT NULL, `localityIdlocality` int NOT NULL, INDEX `IDX_60cf615e36af5776bfdabe039c` (`areasId`), INDEX `IDX_9942b90312cd3089fdcbb39780` (`localityIdlocality`), PRIMARY KEY (`areasId`, `localityIdlocality`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `areas_localities_locality` ADD CONSTRAINT `FK_60cf615e36af5776bfdabe039cb` FOREIGN KEY (`areasId`) REFERENCES `areas`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `areas_localities_locality` ADD CONSTRAINT `FK_9942b90312cd3089fdcbb39780f` FOREIGN KEY (`localityIdlocality`) REFERENCES `locality`(`idlocality`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `areas_localities_locality` DROP FOREIGN KEY `FK_9942b90312cd3089fdcbb39780f`");
        await queryRunner.query("ALTER TABLE `areas_localities_locality` DROP FOREIGN KEY `FK_60cf615e36af5776bfdabe039cb`");
        await queryRunner.query("DROP TABLE `areas_localities_locality`");
    }
}
exports.relationBetweenAreaAndLocalities1676048983973 = relationBetweenAreaAndLocalities1676048983973;
//# sourceMappingURL=1676048983973-relationBetweenAreaAndLocalities.js.map