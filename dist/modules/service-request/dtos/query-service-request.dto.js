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
exports.QueryServiceRequestDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QueryServiceRequestDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { pieceId: { required: true, type: () => String }, createdAt: { required: true, type: () => Object }, requestId: { required: true, type: () => String }, recipientFullname: { required: true, type: () => String }, address: { required: true, type: () => String }, addressNumber: { required: true, type: () => String }, cpa: { required: true, type: () => String }, city: { required: true, type: () => String }, province: { required: true, type: () => String }, envio: { required: true, type: () => String }, caja: { required: true, type: () => Number }, voucher: { required: true, type: () => String }, estado: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "pieceId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "createdAt", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "requestId", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "recipientFullname", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "address", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "addressNumber", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "cpa", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "city", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "province", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "envio", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], QueryServiceRequestDto.prototype, "caja", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "voucher", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], QueryServiceRequestDto.prototype, "estado", void 0);
exports.QueryServiceRequestDto = QueryServiceRequestDto;
//# sourceMappingURL=query-service-request.dto.js.map