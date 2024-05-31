"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increseSeparatorLengthOnFormatSrTable1674194213232 = void 0;
class increseSeparatorLengthOnFormatSrTable1674194213232 {
    constructor() {
        this.name = 'increseSeparatorLengthOnFormatSrTable1674194213232';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `format_sr` DROP COLUMN `separator`");
        await queryRunner.query("ALTER TABLE `format_sr` ADD `separator` varchar(11) NULL");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `format_sr` DROP COLUMN `separator`");
        await queryRunner.query("ALTER TABLE `format_sr` ADD `separator` varchar(9) NULL");
    }
}
exports.increseSeparatorLengthOnFormatSrTable1674194213232 = increseSeparatorLengthOnFormatSrTable1674194213232;
//# sourceMappingURL=1674194213232-increseSeparatorLengthOnFormatSrTable.js.map