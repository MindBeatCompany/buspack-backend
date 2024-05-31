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
exports.UpdatePricesDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const column_pricing_to_update_enum_1 = require("../../enums/column-pricing-to-update.enum");
const update_pricing_type_enum_1 = require("../../enums/update-pricing-type.enum");
class UpdatePricesDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { column: { required: true, enum: require("../../enums/column-pricing-to-update.enum").ColumnPricingToUpdate }, type: { required: true, enum: require("../../enums/update-pricing-type.enum").default }, amount: { required: true, type: () => Number, minimum: 0 } };
    }
}
__decorate([
    class_validator_1.IsEnum(column_pricing_to_update_enum_1.ColumnPricingToUpdate),
    __metadata("design:type", String)
], UpdatePricesDto.prototype, "column", void 0);
__decorate([
    class_validator_1.IsEnum(update_pricing_type_enum_1.default),
    __metadata("design:type", String)
], UpdatePricesDto.prototype, "type", void 0);
__decorate([
    class_validator_1.Min(0),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdatePricesDto.prototype, "amount", void 0);
exports.UpdatePricesDto = UpdatePricesDto;
//# sourceMappingURL=update-prices.dto.js.map