"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_account_dto_1 = require("./create-account.dto");
class UpdateAccountDto extends swagger_1.PickType(create_account_dto_1.CreateAccountDto, [
    "companyName",
    "codeECO",
    "filePath",
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAccountDto = UpdateAccountDto;
//# sourceMappingURL=update-account.dto.js.map