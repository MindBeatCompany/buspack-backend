"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimalAccountDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../../account/dtos");
const account_entity_1 = require("../../../account/entities/account.entity");
class MinimalAccountDto extends swagger_1.PickType(dtos_1.AccountCreatedDto, ['id', 'companyName', 'codeECO', 'accountType']) {
    constructor(account) {
        super();
        this.id = account.id;
        this.codeECO = account.codeECO;
        this.companyName = account.companyName;
        this.accountType = account.accountType;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.MinimalAccountDto = MinimalAccountDto;
//# sourceMappingURL=get-minimal-accounts-response.dto.js.map