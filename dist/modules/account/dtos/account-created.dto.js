"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountCreatedDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AccountCreatedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, companyName: { required: true, type: () => String }, codeECO: { required: true, type: () => String }, accountType: { required: true, type: () => String }, tariffType: { required: true, type: () => String }, filePath: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], AccountCreatedDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AccountCreatedDto.prototype, "companyName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AccountCreatedDto.prototype, "codeECO", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AccountCreatedDto.prototype, "accountType", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AccountCreatedDto.prototype, "tariffType", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AccountCreatedDto.prototype, "filePath", void 0);
exports.AccountCreatedDto = AccountCreatedDto;
//# sourceMappingURL=account-created.dto.js.map