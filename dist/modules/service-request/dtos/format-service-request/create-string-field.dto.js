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
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validate_position_default_value_decorator_1 = require("../../decorators/validate-position-default-value.decorator");
class CreateStringFieldDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { position: { required: true, type: () => Number }, required: { required: true, type: () => Boolean }, length: { required: true, type: () => Number }, defaultValue: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateStringFieldDto.prototype, "position", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateStringFieldDto.prototype, "required", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateStringFieldDto.prototype, "length", void 0);
__decorate([
    validate_position_default_value_decorator_1.ValidatePositionDefaultValue("position", "string"),
    __metadata("design:type", String)
], CreateStringFieldDto.prototype, "defaultValue", void 0);
exports.default = CreateStringFieldDto;
//# sourceMappingURL=create-string-field.dto.js.map