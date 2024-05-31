"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCpaAccountLocalityTableToString1681239487126 = void 0;
class changeCpaAccountLocalityTableToString1681239487126 {
    constructor() {
        this.name = 'changeCpaAccountLocalityTableToString1681239487126';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `cp`");
        await queryRunner.query("ALTER TABLE `account_locality` ADD `cp` varchar(255) NULL");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `cp`");
        await queryRunner.query("ALTER TABLE `account_locality` ADD `cp` int NULL");
    }
}
exports.changeCpaAccountLocalityTableToString1681239487126 = changeCpaAccountLocalityTableToString1681239487126;
//# sourceMappingURL=1681239487126-changeCpaAccountLocalityTableToString.js.map