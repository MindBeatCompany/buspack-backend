"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addQuoteCharColumnToFormatSrTable1675112092520 = void 0;
class addQuoteCharColumnToFormatSrTable1675112092520 {
    constructor() {
        this.name = 'addQuoteCharColumnToFormatSrTable1675112092520';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `format_sr` ADD `quote_char` varchar(1) NOT NULL");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `format_sr` DROP COLUMN `quote_char`");
    }
}
exports.addQuoteCharColumnToFormatSrTable1675112092520 = addQuoteCharColumnToFormatSrTable1675112092520;
//# sourceMappingURL=1675112092520-addQuoteCharColumnToFormatSrTable.js.map