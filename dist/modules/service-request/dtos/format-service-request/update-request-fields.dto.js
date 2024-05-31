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
const class_transformer_1 = require("class-transformer");
const update_string_field_dto_1 = require("./update-string-field.dto");
const update_boolean_field_dto_1 = require("./update-boolean-field.dto");
const update_numeric_field_dto_1 = require("./update-numeric-field.dto");
class UpdateRequestFieldsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { addressApartment: { required: true, type: () => require("./update-string-field.dto").default }, addressBuilding: { required: true, type: () => require("./update-string-field.dto").default }, addressCpa: { required: true, type: () => require("./update-string-field.dto").default }, addressFloor: { required: true, type: () => require("./update-string-field.dto").default }, addressNumber: { required: true, type: () => require("./update-numeric-field.dto").default }, addressStreet: { required: true, type: () => require("./update-string-field.dto").default }, cpa: { required: true, type: () => require("./update-string-field.dto").default }, docNumber: { required: true, type: () => require("./update-string-field.dto").default }, docType: { required: true, type: () => require("./update-string-field.dto").default }, email: { required: true, type: () => require("./update-string-field.dto").default }, enabledPlace: { required: true, type: () => require("./update-string-field.dto").default }, locality: { required: true, type: () => require("./update-string-field.dto").default }, observations: { required: true, type: () => require("./update-string-field.dto").default }, phone: { required: true, type: () => require("./update-string-field.dto").default }, province: { required: true, type: () => require("./update-string-field.dto").default }, qtyPieces: { required: true, type: () => require("./update-numeric-field.dto").default }, recipientFullname: { required: true, type: () => require("./update-string-field.dto").default }, requestId: { required: true, type: () => require("./update-string-field.dto").default }, totalWeight: { required: true, type: () => require("./update-numeric-field.dto").default }, homeDelivery: { required: true, type: () => require("./update-boolean-field.dto").default } };
    }
}
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "addressApartment", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "addressBuilding", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "addressCpa", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "addressFloor", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_numeric_field_dto_1.default),
    __metadata("design:type", update_numeric_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "addressNumber", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "addressStreet", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "cpa", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "docNumber", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "docType", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "email", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "enabledPlace", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "locality", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "observations", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "province", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_numeric_field_dto_1.default),
    __metadata("design:type", update_numeric_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "qtyPieces", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "recipientFullname", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_string_field_dto_1.default),
    __metadata("design:type", update_string_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "requestId", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_numeric_field_dto_1.default),
    __metadata("design:type", update_numeric_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "totalWeight", void 0);
__decorate([
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => update_boolean_field_dto_1.default),
    __metadata("design:type", update_boolean_field_dto_1.default)
], UpdateRequestFieldsDto.prototype, "homeDelivery", void 0);
exports.default = UpdateRequestFieldsDto;
//# sourceMappingURL=update-request-fields.dto.js.map