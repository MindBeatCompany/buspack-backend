"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLocalityProvinceCpColumnsToAccountLocalityTable1670880677371 = void 0;
class addLocalityProvinceCpColumnsToAccountLocalityTable1670880677371 {
    constructor() {
        this.name = 'addLocalityProvinceCpColumnsToAccountLocalityTable1670880677371';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `account_locality` ADD `locality` varchar(255)");
        await queryRunner.query("ALTER TABLE `account_locality` ADD `province` varchar(255)");
        await queryRunner.query("ALTER TABLE `account_locality` ADD `cp` int");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `cp`");
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `province`");
        await queryRunner.query("ALTER TABLE `account_locality` DROP COLUMN `locality`");
    }
}
exports.addLocalityProvinceCpColumnsToAccountLocalityTable1670880677371 = addLocalityProvinceCpColumnsToAccountLocalityTable1670880677371;
//# sourceMappingURL=1670880677371-addLocalityProvinceCpColumnsToAccountLocalityTable.js.map