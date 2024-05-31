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
exports.UserLoggedDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../account/dtos");
const account_entity_1 = require("../../account/entities/account.entity");
class UserLoggedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userName: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, firstTimeLogged: { required: true, type: () => Boolean }, sessionTime: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, companyName: { required: true, type: () => String }, codeECO: { required: true, type: () => String }, account: { required: true, type: () => require("../../account/dtos/account-created.dto").AccountCreatedDto }, roles: { required: true, type: () => String }, token: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UserLoggedDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoggedDto.prototype, "userName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoggedDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoggedDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UserLoggedDto.prototype, "isActive", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UserLoggedDto.prototype, "firstTimeLogged", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UserLoggedDto.prototype, "sessionTime", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], UserLoggedDto.prototype, "createdAt", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoggedDto.prototype, "companyName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoggedDto.prototype, "codeECO", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoggedDto.prototype, "roles", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserLoggedDto.prototype, "token", void 0);
exports.UserLoggedDto = UserLoggedDto;
//# sourceMappingURL=user-logged.dto.js.map