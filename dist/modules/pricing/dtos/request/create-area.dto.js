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
exports.CreateAreaDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_pricing_locality_dto_1 = require("./create-pricing-locality.dto");
class CreateAreaDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, finalKilogramValue: { required: true, type: () => Number, minimum: 1, maximum: 8388607 }, increasedWeight: { required: true, type: () => Number, minimum: 1, maximum: 8388607 }, startingTariffPrice: { required: true, type: () => Number, minimum: 0, maximum: 8388607 }, tariffPriceIncrease: { required: true, type: () => Number, minimum: 0, maximum: 8388607 }, insurance: { required: true, type: () => Number, minimum: 0, maximum: 8388607 }, homeDelivery: { required: true, type: () => Number, minimum: 0, maximum: 8388607 }, homeWithdrawal: { required: true, type: () => Number, minimum: 0, maximum: 8388607 }, others: { required: true, type: () => Number, minimum: 0, maximum: 8388607 }, additionalPriceIncrease: { required: true, type: () => Number, minimum: 0, maximum: 8388607 }, localities: { required: true, type: () => [require("./create-pricing-locality.dto").LocalityOnCreatePricingDto] } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Transform(({ value }) => value === null || value === void 0 ? void 0 : value.trim()),
    swagger_1.ApiProperty({ example: "AMBA" }),
    __metadata("design:type", String)
], CreateAreaDto.prototype, "name", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 100 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "finalKilogramValue", void 0);
__decorate([
    class_validator_1.Min(1),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 20 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "increasedWeight", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 1100 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "startingTariffPrice", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 600 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "tariffPriceIncrease", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 780 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "insurance", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 745 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "homeDelivery", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 300 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "homeWithdrawal", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 800 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "others", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.Max(8388607),
    class_validator_1.IsInt(),
    swagger_1.ApiProperty({ example: 220 }),
    __metadata("design:type", Number)
], CreateAreaDto.prototype, "additionalPriceIncrease", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayMinSize(1),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => create_pricing_locality_dto_1.LocalityOnCreatePricingDto),
    __metadata("design:type", Array)
], CreateAreaDto.prototype, "localities", void 0);
exports.CreateAreaDto = CreateAreaDto;
//# sourceMappingURL=create-area.dto.js.map