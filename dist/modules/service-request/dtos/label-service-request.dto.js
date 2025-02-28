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
exports.LabelServiceRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LabelServiceRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { pieceId: { required: true, type: () => Object }, recipientFullname: { required: true, type: () => String }, address: { required: true, type: () => String }, cpa: { required: true, type: () => String }, city: { required: true, type: () => String }, province: { required: true, type: () => String }, requestId: { required: true, type: () => String }, shipping: { required: true, type: () => String }, voucher: { required: true, type: () => String }, status: { required: true, type: () => String }, phone: { required: true, type: () => String }, observations: { required: true, type: () => String }, origin: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "pieceId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "recipientFullname", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "cpa", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "city", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "province", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "requestId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "shipping", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "voucher", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "phone", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "observations", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LabelServiceRequestDto.prototype, "origin", void 0);
exports.LabelServiceRequestDto = LabelServiceRequestDto;
//# sourceMappingURL=label-service-request.dto.js.map