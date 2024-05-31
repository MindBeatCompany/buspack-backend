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
exports.RegisterDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegisterDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String, maxLength: 255 }, lastName: { required: true, type: () => String, maxLength: 255 }, email: { required: true, type: () => String }, isActive: { required: false, type: () => Boolean }, password: { required: true, type: () => String, minLength: 8, maxLength: 128 }, repassword: { required: true, type: () => String, minLength: 8, maxLength: 128 }, rol: { required: false, type: () => String }, sessionTime: { required: false, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(255),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(255),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], RegisterDto.prototype, "isActive", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(128),
    class_validator_1.MinLength(8),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(128),
    class_validator_1.MinLength(8),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], RegisterDto.prototype, "repassword", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "rol", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], RegisterDto.prototype, "sessionTime", void 0);
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map