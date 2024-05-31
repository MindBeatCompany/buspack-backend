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
exports.UserCreatedDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../account/dtos");
const dtos_2 = require("../../role/dtos");
class UserCreatedDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userName: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, role: { required: true, type: () => require("../../role/dtos/role-created.dto").RoleCreatedDto }, account: { required: true, type: () => require("../../account/dtos/account-created.dto").AccountCreatedDto }, sessionTime: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UserCreatedDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserCreatedDto.prototype, "userName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserCreatedDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserCreatedDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserCreatedDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UserCreatedDto.prototype, "isActive", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UserCreatedDto.prototype, "sessionTime", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], UserCreatedDto.prototype, "createdAt", void 0);
exports.UserCreatedDto = UserCreatedDto;
//# sourceMappingURL=user-created.dto.js.map