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
exports.CreateAppMenuDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAppMenuDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, maxLength: 255 }, roles: { required: true, type: () => [String], maxLength: 20 }, url: { required: true, type: () => String }, menuParent: { required: false, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MaxLength(255),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAppMenuDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.MaxLength(20, {
        each: true,
    }),
    __metadata("design:type", Array)
], CreateAppMenuDto.prototype, "roles", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAppMenuDto.prototype, "url", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAppMenuDto.prototype, "menuParent", void 0);
exports.CreateAppMenuDto = CreateAppMenuDto;
//# sourceMappingURL=createAppMenu.dto.js.map