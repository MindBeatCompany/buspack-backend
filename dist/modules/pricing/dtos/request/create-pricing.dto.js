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
exports.CreatePricingDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_area_dto_1 = require("./create-area.dto");
class CreatePricingDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, validSince: { required: true, type: () => Date }, areas: { required: true, type: () => [require("./create-area.dto").CreateAreaDto] }, accountId: { required: true, type: () => Number, minimum: 1 } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Transform(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    swagger_1.ApiProperty({ example: "TARIFARIO NUEVO" }),
    __metadata("design:type", String)
], CreatePricingDto.prototype, "name", void 0);
__decorate([
    class_transformer_1.Type(() => Date),
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], CreatePricingDto.prototype, "validSince", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayMinSize(1),
    class_validator_1.ArrayMaxSize(8),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => create_area_dto_1.CreateAreaDto),
    __metadata("design:type", Array)
], CreatePricingDto.prototype, "areas", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CreatePricingDto.prototype, "accountId", void 0);
exports.CreatePricingDto = CreatePricingDto;
//# sourceMappingURL=create-pricing.dto.js.map