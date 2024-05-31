"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTableFormatSR1669299630069 = void 0;
class createTableFormatSR1669299630069 {
    constructor() {
        this.name = 'createTableFormatSR1669299630069';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `format_sr` (`id` int NOT NULL AUTO_INCREMENT, `format` varchar(3) NOT NULL, `separator` varchar(9), `account_id` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE `format_sr`");
    }
}
exports.createTableFormatSR1669299630069 = createTableFormatSR1669299630069;
//# sourceMappingURL=1669299630069-createFormatSrTable.js.map