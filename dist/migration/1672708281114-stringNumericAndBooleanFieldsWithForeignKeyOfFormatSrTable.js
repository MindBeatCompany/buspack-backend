"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringNumericAndBooleanFieldsWithForeignKeyOfFormatSrTable1672708281114 = void 0;
class stringNumericAndBooleanFieldsWithForeignKeyOfFormatSrTable1672708281114 {
    constructor() {
        this.name = 'stringNumericAndBooleanFieldsWithForeignKeyOfFormatSrTable1672708281114';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `account_id` `format_sr_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `field_number` CHANGE `account_id` `format_sr_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `account_id` `format_sr_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `field_string` ADD CONSTRAINT `FK_8c8d5100e74e1075dcea183b234` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `field_number` ADD CONSTRAINT `FK_1b212ceea1ca624b87367f227d9` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `field_boolean` ADD CONSTRAINT `FK_f61eda80c46fde338e93f26075a` FOREIGN KEY (`format_sr_id`) REFERENCES `format_sr`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `field_boolean` DROP FOREIGN KEY `FK_f61eda80c46fde338e93f26075a`");
        await queryRunner.query("ALTER TABLE `field_number` DROP FOREIGN KEY `FK_1b212ceea1ca624b87367f227d9`");
        await queryRunner.query("ALTER TABLE `field_string` DROP FOREIGN KEY `FK_8c8d5100e74e1075dcea183b234`");
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `format_sr_id` `account_id` smallint NOT NULL");
        await queryRunner.query("ALTER TABLE `field_number` CHANGE `format_sr_id` `account_id` smallint NOT NULL");
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `format_sr_id` `account_id` smallint NOT NULL");
    }
}
exports.stringNumericAndBooleanFieldsWithForeignKeyOfFormatSrTable1672708281114 = stringNumericAndBooleanFieldsWithForeignKeyOfFormatSrTable1672708281114;
//# sourceMappingURL=1672708281114-stringNumericAndBooleanFieldsWithForeignKeyOfFormatSrTable.js.map