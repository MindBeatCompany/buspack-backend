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
exports.TariffEntity = void 0;
const openapi = require("@nestjs/swagger");
const account_entity_1 = require("../../account/entities/account.entity");
const typeorm_1 = require("typeorm");
let TariffEntity = class TariffEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, account: { required: true, type: () => require("../../account/entities/account.entity").AccountEntity }, weightFrom: { required: true, type: () => Number }, weightTo: { required: true, type: () => Number }, caba: { required: true, type: () => Number }, amba: { required: true, type: () => Number }, inside_pba: { required: true, type: () => Number }, inside1: { required: true, type: () => Number }, inside2: { required: true, type: () => Number }, inside3: { required: true, type: () => Number }, inside4: { required: true, type: () => Number }, insurance: { required: true, type: () => Number }, homeDelivery: { required: true, type: () => Number }, homeWithdrawal: { required: true, type: () => Number }, otherAmounts: { required: true, type: () => Number }, createdAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TariffEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => account_entity_1.AccountEntity, (account) => account.tariff),
    __metadata("design:type", account_entity_1.AccountEntity)
], TariffEntity.prototype, "account", void 0);
__decorate([
    typeorm_1.Column({
        name: "weight_from",
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "weightFrom", void 0);
__decorate([
    typeorm_1.Column({
        name: "weight_to",
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "weightTo", void 0);
__decorate([
    typeorm_1.Column({
        name: "caba",
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "caba", void 0);
__decorate([
    typeorm_1.Column({
        name: "amba",
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "amba", void 0);
__decorate([
    typeorm_1.Column({
        name: "inside_pba",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Interior PBA",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "inside_pba", void 0);
__decorate([
    typeorm_1.Column({
        name: "inside1",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Interior 1",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "inside1", void 0);
__decorate([
    typeorm_1.Column({
        name: "inside2",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Interior 2",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "inside2", void 0);
__decorate([
    typeorm_1.Column({
        name: "inside3",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Interior 3",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "inside3", void 0);
__decorate([
    typeorm_1.Column({
        name: "inside4",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Interior 4",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "inside4", void 0);
__decorate([
    typeorm_1.Column({
        name: "insurance",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Seguro",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "insurance", void 0);
__decorate([
    typeorm_1.Column({
        name: "home_delivery",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Envio a Domicilio",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "homeDelivery", void 0);
__decorate([
    typeorm_1.Column({
        name: "home_withdrawal",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Retiro a Domicilio",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "homeWithdrawal", void 0);
__decorate([
    typeorm_1.Column({
        name: "other_amounts",
        type: "decimal",
        precision: 10,
        scale: 2,
        comment: "Otros Importes",
        default: 0,
    }),
    __metadata("design:type", Number)
], TariffEntity.prototype, "otherAmounts", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], TariffEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: "deleted_at", type: "timestamp" }),
    __metadata("design:type", Date)
], TariffEntity.prototype, "deletedAt", void 0);
TariffEntity = __decorate([
    typeorm_1.Entity("tariff")
], TariffEntity);
exports.TariffEntity = TariffEntity;
//# sourceMappingURL=tariff.entity.js.map