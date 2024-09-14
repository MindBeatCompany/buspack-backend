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
exports.AccountEntity = void 0;
const openapi = require("@nestjs/swagger");
const tariff_entity_1 = require("../../user/entities/tariff.entity");
const service_request_entity_1 = require("../../service-request/entities/service-request.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const pricing_entity_1 = require("../../pricing/entities/pricing.entity");
const today_midnight_1 = require("../../../shared/today-midnight");
const update_prices_dto_1 = require("../../pricing/dtos/request/update-prices.dto");
let AccountEntity = class AccountEntity {
    validatePricing(name, validSince) {
        if (this.haveCurrentPricing() && validSince.getTime() <= this.currentPricing().validSince.getTime()) {
            throw new Error("No se puede crear un tarifario con una fecha igual o menor a la del tarifario vigente");
        }
        if (this.pricings.some(it => it.validSince.getTime() === validSince.getTime())) {
            throw new Error("No se puede crear un tarifario con la misma fecha que un tarifario ya creado");
        }
        if (this.existPricingCalled(name)) {
            throw new Error(`${this.companyName} ya posee un tarifario llamado ${name}.`);
        }
    }
    updateCurrentPrices(updatePricesRequest) {
        return this.currentPricing().updateCurrentPrices(updatePricesRequest);
    }
    currentPricing() {
        if (this.pricings.length === 0) {
            return null;
        }
        const today = today_midnight_1.default();
        const obtainedPricing = this.pricings.reduce((prev, curr) => {
            return this.canChange(curr, prev, today) ? curr : prev;
        }, this.pricings[0]);
        if (obtainedPricing.validSince > today) {
            throw new Error(`${this.companyName} does not have a current pricing table`);
        }
        return obtainedPricing;
    }
    haveCurrentPricing() {
        try {
            return this.currentPricing() !== null;
        }
        catch (_) {
            return false;
        }
    }
    existPricingCalled(name) {
        return this.pricings.some(it => it.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    }
    canChange(curr, prev, today) {
        return (curr.validSince === today) ||
            (curr.validSince > prev.validSince && curr.validSince <= today) ||
            (curr.validSince <= today && prev.validSince > today);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, companyName: { required: true, type: () => String }, idClientEntity: { required: true, type: () => Number }, idClientAgent: { required: true, type: () => Number }, cuit: { required: true, type: () => String }, codeECO: { required: true, type: () => String }, addressStreet: { required: true, type: () => String }, addressNumber: { required: true, type: () => String }, addressBuilding: { required: true, type: () => String }, addressFloor: { required: true, type: () => String }, addressApartment: { required: true, type: () => String }, locality: { required: true, type: () => String }, province: { required: true, type: () => String }, country: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, accountType: { required: true, type: () => String }, users: { required: true, type: () => [require("../../user/entities/user.entity").UserEntity] }, filePath: { required: true, type: () => String }, tariff: { required: true, type: () => [require("../../user/entities/tariff.entity").TariffEntity] }, serviceRequest: { required: true, type: () => [require("../../service-request/entities/service-request.entity").ServiceRequestEntity] }, pricings: { required: true, type: () => [require("../../pricing/entities/pricing.entity").PricingEntity] }, hasCustomPricing: { required: true, type: () => Boolean }, tariffType: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AccountEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "company_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], AccountEntity.prototype, "companyName", void 0);
__decorate([
    typeorm_1.Column({ name: "id_clientEntity", type: "int", nullable: true }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "idClientEntity", void 0);
__decorate([
    typeorm_1.Column({ name: "id_clientAgent", type: "int", nullable: true }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "idClientAgent", void 0);
__decorate([
    typeorm_1.Column({ name: "cuit", type: "varchar", length: 30, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "cuit", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 30 }),
    __metadata("design:type", String)
], AccountEntity.prototype, "codeECO", void 0);
__decorate([
    typeorm_1.Column({ name: "address_street", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "addressStreet", void 0);
__decorate([
    typeorm_1.Column({ name: "address_number", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "addressNumber", void 0);
__decorate([
    typeorm_1.Column({ name: "address_building", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "addressBuilding", void 0);
__decorate([
    typeorm_1.Column({ name: "address_floor", type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "addressFloor", void 0);
__decorate([
    typeorm_1.Column({ name: "address_apartment", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "addressApartment", void 0);
__decorate([
    typeorm_1.Column({ name: "locality", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "locality", void 0);
__decorate([
    typeorm_1.Column({ name: "province", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "province", void 0);
__decorate([
    typeorm_1.Column({ name: "country", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], AccountEntity.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({ type: "bool", default: true, select: false }),
    __metadata("design:type", Boolean)
], AccountEntity.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({ name: "account_type", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], AccountEntity.prototype, "accountType", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.UserEntity, (user) => user.id),
    __metadata("design:type", Array)
], AccountEntity.prototype, "users", void 0);
__decorate([
    typeorm_1.Column({ name: "file_path", type: "varchar", default: null }),
    __metadata("design:type", String)
], AccountEntity.prototype, "filePath", void 0);
__decorate([
    typeorm_1.OneToMany(() => tariff_entity_1.TariffEntity, (tariff) => tariff.id),
    __metadata("design:type", Array)
], AccountEntity.prototype, "tariff", void 0);
__decorate([
    typeorm_1.OneToMany(() => service_request_entity_1.ServiceRequestEntity, (serviceRequest) => serviceRequest.id),
    __metadata("design:type", Array)
], AccountEntity.prototype, "serviceRequest", void 0);
__decorate([
    typeorm_1.OneToMany(() => pricing_entity_1.PricingEntity, (pricing) => pricing.account),
    __metadata("design:type", Array)
], AccountEntity.prototype, "pricings", void 0);
__decorate([
    typeorm_1.Column({ name: "has_custom_pricing", default: false }),
    __metadata("design:type", Boolean)
], AccountEntity.prototype, "hasCustomPricing", void 0);
__decorate([
    typeorm_1.Column({ name: "tariff_type", type: "varchar", length: 30 }),
    __metadata("design:type", String)
], AccountEntity.prototype, "tariffType", void 0);
AccountEntity = __decorate([
    typeorm_1.Entity("accounts")
], AccountEntity);
exports.AccountEntity = AccountEntity;
//# sourceMappingURL=account.entity.js.map