"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addhasCustomPricingInAccountEntity1681997558731 = void 0;
class addhasCustomPricingInAccountEntity1681997558731 {
    constructor() {
        this.name = 'addhasCustomPricingInAccountEntity1681997558731';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `accounts` ADD `has_custom_pricing` tinyint NOT NULL DEFAULT 0");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `accounts` DROP COLUMN `has_custom_pricing`");
    }
}
exports.addhasCustomPricingInAccountEntity1681997558731 = addhasCustomPricingInAccountEntity1681997558731;
//# sourceMappingURL=1681997558731-addhasCustomPricingInAccountEntity.js.map