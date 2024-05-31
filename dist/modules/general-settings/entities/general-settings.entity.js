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
exports.GeneralSettingsEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let GeneralSettingsEntity = class GeneralSettingsEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, descLugarOrigen: { required: true, type: () => String }, idLugarOrigen: { required: true, type: () => Number }, idSeguro: { required: true, type: () => Number }, letraComprobante: { required: true, type: () => String }, bocaComprobante: { required: true, type: () => String }, idRetiroADomicilio: { required: true, type: () => Number }, idEntregaDomicilio: { required: true, type: () => Number }, idAgenciaOrigen: { required: true, type: () => Number }, descAgenciaOrigen: { required: true, type: () => Object }, domicilioAgenciaOrigen: { required: true, type: () => Object }, telefonoAgenciaOrigen: { required: true, type: () => Object }, cpAgenciaOrigen: { required: true, type: () => Object }, otrosImportes: { required: true, type: () => Number } };
    }
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], GeneralSettingsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "desc_lugar_origen", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], GeneralSettingsEntity.prototype, "descLugarOrigen", void 0);
__decorate([
    typeorm_1.Column({ name: "id_lugar_origen", type: "int" }),
    __metadata("design:type", Number)
], GeneralSettingsEntity.prototype, "idLugarOrigen", void 0);
__decorate([
    typeorm_1.Column({ name: "id_seguro", type: "int" }),
    __metadata("design:type", Number)
], GeneralSettingsEntity.prototype, "idSeguro", void 0);
__decorate([
    typeorm_1.Column({ name: "letra_comprobante", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], GeneralSettingsEntity.prototype, "letraComprobante", void 0);
__decorate([
    typeorm_1.Column({ name: "boca_comprobante", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], GeneralSettingsEntity.prototype, "bocaComprobante", void 0);
__decorate([
    typeorm_1.Column({ name: "id_retiro_a_domicilio", type: "int" }),
    __metadata("design:type", Number)
], GeneralSettingsEntity.prototype, "idRetiroADomicilio", void 0);
__decorate([
    typeorm_1.Column({ name: "id_entrega_domicilio", type: "int" }),
    __metadata("design:type", Number)
], GeneralSettingsEntity.prototype, "idEntregaDomicilio", void 0);
__decorate([
    typeorm_1.Column({ name: "id_agencia_origen", type: "int" }),
    __metadata("design:type", Number)
], GeneralSettingsEntity.prototype, "idAgenciaOrigen", void 0);
__decorate([
    typeorm_1.Column({ name: "desc_agencia_origen", type: "varchar", length: 255 }),
    __metadata("design:type", Object)
], GeneralSettingsEntity.prototype, "descAgenciaOrigen", void 0);
__decorate([
    typeorm_1.Column({ name: "domicilio_agencia_origen", type: "varchar", length: 255 }),
    __metadata("design:type", Object)
], GeneralSettingsEntity.prototype, "domicilioAgenciaOrigen", void 0);
__decorate([
    typeorm_1.Column({ name: "telefono_agencia_origen", type: "varchar", length: 255 }),
    __metadata("design:type", Object)
], GeneralSettingsEntity.prototype, "telefonoAgenciaOrigen", void 0);
__decorate([
    typeorm_1.Column({ name: "cp_agencia_origen", type: "varchar", length: 255 }),
    __metadata("design:type", Object)
], GeneralSettingsEntity.prototype, "cpAgenciaOrigen", void 0);
__decorate([
    typeorm_1.Column({ name: "otros_importes", type: "int" }),
    __metadata("design:type", Number)
], GeneralSettingsEntity.prototype, "otrosImportes", void 0);
GeneralSettingsEntity = __decorate([
    typeorm_1.Entity('general-settings')
], GeneralSettingsEntity);
exports.GeneralSettingsEntity = GeneralSettingsEntity;
//# sourceMappingURL=general-settings.entity.js.map