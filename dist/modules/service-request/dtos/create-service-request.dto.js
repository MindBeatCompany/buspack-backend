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
exports.CreateServiceRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateServiceRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, recipient: { required: true, type: () => String }, docType: { required: true, type: () => String }, docNumber: { required: true, type: () => String }, phone: { required: true, type: () => String }, email: { required: true, type: () => String }, address: { required: true, type: () => String }, addressNumber: { required: true, type: () => String }, addressBuil: { required: true, type: () => String }, addressFloor: { required: true, type: () => String }, addressApartment: { required: true, type: () => String }, enabledPlace: { required: true, type: () => String }, city: { required: true, type: () => String }, province: { required: true, type: () => String }, cpa: { required: true, type: () => String }, pieces: { required: true, type: () => Number }, weight: { required: true, type: () => Number }, homeDelivery: { required: true, type: () => Boolean }, obs: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "recipient", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "docType", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "docNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "addressNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "addressBuil", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "addressFloor", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "addressApartment", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "enabledPlace", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "city", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "province", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "cpa", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "pieces", void 0);
__decorate([
    class_validator_1.IsDecimal(),
    __metadata("design:type", Number)
], CreateServiceRequestDto.prototype, "weight", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateServiceRequestDto.prototype, "homeDelivery", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateServiceRequestDto.prototype, "obs", void 0);
exports.CreateServiceRequestDto = CreateServiceRequestDto;
//# sourceMappingURL=create-service-request.dto.js.map