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
exports.CreateFormatServiceRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const format_validator_1 = require("../../../../shared/validators/format-validator");
const separator_validator_1 = require("../../../../shared/validators/separator-validator");
const class_transformer_1 = require("class-transformer");
const create_request_fields_dto_1 = require("./create-request-fields.dto");
const validate_format_separator_decorator_1 = require("../../decorators/validate-format-separator.decorator");
class CreateFormatServiceRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { format: { required: true, type: () => String }, separator: { required: true, type: () => String }, accountId: { required: true, type: () => Number }, requestFields: { required: true, type: () => require("./create-request-fields.dto").default }, quoteChar: { required: true, type: () => String, minLength: 1, maxLength: 1 } };
    }
}
__decorate([
    validate_format_separator_decorator_1.ValidateFormatSeparator("format", "separator"),
    class_validator_1.Validate(format_validator_1.FormatValidator),
    __metadata("design:type", String)
], CreateFormatServiceRequestDto.prototype, "format", void 0);
__decorate([
    class_validator_1.Validate(separator_validator_1.SeparatorValidator),
    validate_format_separator_decorator_1.ValidateFormatSeparator("format", "separator"),
    __metadata("design:type", String)
], CreateFormatServiceRequestDto.prototype, "separator", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateFormatServiceRequestDto.prototype, "accountId", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => create_request_fields_dto_1.default),
    __metadata("design:type", create_request_fields_dto_1.default)
], CreateFormatServiceRequestDto.prototype, "requestFields", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    class_validator_1.MaxLength(1),
    class_validator_1.IsAscii(),
    __metadata("design:type", String)
], CreateFormatServiceRequestDto.prototype, "quoteChar", void 0);
exports.CreateFormatServiceRequestDto = CreateFormatServiceRequestDto;
//# sourceMappingURL=create-format-service-request.dto.js.map