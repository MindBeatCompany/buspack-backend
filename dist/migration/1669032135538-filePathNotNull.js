"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filePathNotNull1669032135538 = void 0;
class filePathNotNull1669032135538 {
    constructor() {
        this.name = 'filePathNotNull1669032135538';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `file_path` `file_path` varchar(255) NULL DEFAULT NULL");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `accounts` CHANGE `file_path` `file_path` varchar(255) NULL");
    }
}
exports.filePathNotNull1669032135538 = filePathNotNull1669032135538;
//# sourceMappingURL=1669032135538-filePathNotNull.js.map