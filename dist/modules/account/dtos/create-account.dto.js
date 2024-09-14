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
exports.CreateAccountDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAccountDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { companyName: { required: true, type: () => String }, codeECO: { required: true, type: () => String }, accountType: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, filePath: { required: true, type: () => String }, idClientEntity: { required: true, type: () => String }, idClientAgent: { required: true, type: () => String }, addressStreet: { required: true, type: () => String }, addressNumber: { required: true, type: () => String }, addressFloor: { required: true, type: () => String }, addressApartment: { required: true, type: () => String }, addressBuilding: { required: true, type: () => String }, locality: { required: true, type: () => String }, province: { required: true, type: () => String }, country: { required: true, type: () => String }, cuil: { required: true, type: () => String }, tariffType: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "companyName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "codeECO", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "accountType", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateAccountDto.prototype, "isActive", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "filePath", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "idClientEntity", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "idClientAgent", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "addressStreet", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "addressNumber", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "addressFloor", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "addressApartment", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "addressBuilding", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "locality", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "province", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "country", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "cuil", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "tariffType", void 0);
exports.CreateAccountDto = CreateAccountDto;
//# sourceMappingURL=create-account.dto.js.map