"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccountLocalityTable1670860485699 = void 0;
class addAccountLocalityTable1670860485699 {
    constructor() {
        this.name = 'addAccountLocalityTable1670860485699';
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `account_locality` (`id` int NOT NULL AUTO_INCREMENT, `account_id` smallint NOT NULL, `enabled_place_id` smallint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP TABLE `account_locality`");
    }
}
exports.addAccountLocalityTable1670860485699 = addAccountLocalityTable1670860485699;
//# sourceMappingURL=1670860485699-createAccountLocalityTable.js.map