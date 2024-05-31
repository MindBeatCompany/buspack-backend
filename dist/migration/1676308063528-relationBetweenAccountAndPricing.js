"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.relationBetweenAccountAndPricing1676308063528 = void 0;
class relationBetweenAccountAndPricing1676308063528 {
    constructor() {
        this.name = 'relationBetweenAccountAndPricing1676308063528';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `pricings` ADD `account_id` int NULL");
        await queryRunner.query("ALTER TABLE `pricings` ADD CONSTRAINT `FK_6150d880fa40c618967814ac55d` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `pricings` DROP FOREIGN KEY `FK_6150d880fa40c618967814ac55d`");
        await queryRunner.query("ALTER TABLE `pricings` DROP COLUMN `account_id`");
    }
}
exports.relationBetweenAccountAndPricing1676308063528 = relationBetweenAccountAndPricing1676308063528;
//# sourceMappingURL=1676308063528-relationBetweenAccountAndPricing.js.map