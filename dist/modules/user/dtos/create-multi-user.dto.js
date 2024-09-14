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
exports.CreateMultiUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMultiUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { companyName: { required: true, type: () => String }, idClientEntity: { required: true, type: () => Number }, idClientAgent: { required: true, type: () => Number }, cuit: { required: true, type: () => String }, addressStreet: { required: true, type: () => String }, addressNumber: { required: true, type: () => String }, addressBuilding: { required: true, type: () => String }, addressFloor: { required: true, type: () => String }, addressApartment: { required: true, type: () => String }, locality: { required: true, type: () => String }, province: { required: true, type: () => String }, country: { required: true, type: () => String }, accountType: { required: true, type: () => String }, codeEco: { required: true, type: () => String }, tariffType: { required: true, type: () => String }, filePath: { required: true, type: () => String }, users: { required: true, type: () => [require("./createUser.dto").CreateUserDto] } };
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "companyName", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateMultiUserDto.prototype, "idClientEntity", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateMultiUserDto.prototype, "idClientAgent", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "cuit", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "addressStreet", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "addressNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "addressBuilding", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "addressFloor", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "addressApartment", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "locality", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "province", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "country", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "accountType", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "codeEco", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "tariffType", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateMultiUserDto.prototype, "filePath", void 0);
__decorate([
    class_validator_1.ArrayNotEmpty(),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], CreateMultiUserDto.prototype, "users", void 0);
exports.CreateMultiUserDto = CreateMultiUserDto;
//# sourceMappingURL=create-multi-user.dto.js.map