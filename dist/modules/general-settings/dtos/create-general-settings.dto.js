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
exports.CreateGeneralSettingsDTO = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateGeneralSettingsDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, descLugarOrigen: { required: true, type: () => String }, idLugarOrigen: { required: true, type: () => Number }, idSeguro: { required: true, type: () => Number }, letraComprobante: { required: true, type: () => String }, bocaComprobante: { required: true, type: () => String }, idRetiroADomicilio: { required: true, type: () => Number }, idEntregaDomicilio: { required: true, type: () => Number }, idAgenciaOrigen: { required: true, type: () => Number }, descAgenciaOrigen: { required: true, type: () => String }, domicilioAgenciaOrigen: { required: true, type: () => String }, telefonoAgenciaOrigen: { required: true, type: () => String }, cpAgenciaOrigen: { required: true, type: () => String }, otrosImportes: { required: true, type: () => Number } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateGeneralSettingsDTO.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGeneralSettingsDTO.prototype, "descLugarOrigen", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateGeneralSettingsDTO.prototype, "idLugarOrigen", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateGeneralSettingsDTO.prototype, "idSeguro", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGeneralSettingsDTO.prototype, "letraComprobante", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGeneralSettingsDTO.prototype, "bocaComprobante", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateGeneralSettingsDTO.prototype, "idRetiroADomicilio", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateGeneralSettingsDTO.prototype, "idEntregaDomicilio", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateGeneralSettingsDTO.prototype, "idAgenciaOrigen", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGeneralSettingsDTO.prototype, "descAgenciaOrigen", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGeneralSettingsDTO.prototype, "domicilioAgenciaOrigen", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGeneralSettingsDTO.prototype, "telefonoAgenciaOrigen", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateGeneralSettingsDTO.prototype, "cpAgenciaOrigen", void 0);
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], CreateGeneralSettingsDTO.prototype, "otrosImportes", void 0);
exports.CreateGeneralSettingsDTO = CreateGeneralSettingsDTO;
//# sourceMappingURL=create-general-settings.dto.js.map