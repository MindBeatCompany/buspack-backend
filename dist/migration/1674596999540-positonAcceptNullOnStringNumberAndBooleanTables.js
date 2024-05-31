"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positonAcceptNullOnStringNumberAndBooleanTables1674596999540 = void 0;
class positonAcceptNullOnStringNumberAndBooleanTables1674596999540 {
    constructor() {
        this.name = 'positonAcceptNullOnStringNumberAndBooleanTables1674596999540';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `position` `position` tinyint NULL");
        await queryRunner.query("ALTER TABLE `field_number` CHANGE `position` `position` tinyint NULL");
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `position` `position` tinyint NULL");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `field_boolean` CHANGE `position` `position` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `field_number` CHANGE `position` `position` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `field_string` CHANGE `position` `position` tinyint NOT NULL");
    }
}
exports.positonAcceptNullOnStringNumberAndBooleanTables1674596999540 = positonAcceptNullOnStringNumberAndBooleanTables1674596999540;
//# sourceMappingURL=1674596999540-positonAcceptNullOnStringNumberAndBooleanTables.js.map