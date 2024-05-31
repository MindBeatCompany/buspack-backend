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
exports.PricingEntity = void 0;
const openapi = require("@nestjs/swagger");
const account_entity_1 = require("../../account/entities/account.entity");
const enabled_places_entity_1 = require("../../enabled-places/entities/enabled-places.entity");
const typeorm_1 = require("typeorm");
const area_entity_1 = require("./area.entity");
let PricingEntity = class PricingEntity {
    constructor() {
        this.lastAreaNumber = 1;
    }
    addArea(newArea) {
        newArea.position = this.lastAreaNumber++;
        newArea.generatePriceTable();
        this.areas.push(newArea);
    }
    updateCurrentPrices(updatePricesRequest) {
        this.areas.forEach(it => it.updateCurrentPrices(updatePricesRequest));
        return this;
    }
    getAreaFromEnabledPlace(enabledPlace) {
        const maybeArea = this.areas.find(area => area.containsLocality(enabledPlace));
        return maybeArea ? maybeArea : null;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, lastAreaNumber: { required: true, type: () => Number, default: 1 }, areas: { required: true, type: () => [require("./area.entity").AreaEntity] }, account: { required: true, type: () => require("../../account/entities/account.entity").AccountEntity }, validSince: { required: true, type: () => Date } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PricingEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], PricingEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: "last_area_number", type: "tinyint" }),
    __metadata("design:type", Number)
], PricingEntity.prototype, "lastAreaNumber", void 0);
__decorate([
    typeorm_1.OneToMany(() => area_entity_1.AreaEntity, (area) => area.pricing, {
        eager: true,
        cascade: true
    }),
    __metadata("design:type", Array)
], PricingEntity.prototype, "areas", void 0);
__decorate([
    typeorm_1.ManyToOne(() => account_entity_1.AccountEntity, () => (account) => account.pricings, { onDelete: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: "account_id" }),
    __metadata("design:type", account_entity_1.AccountEntity)
], PricingEntity.prototype, "account", void 0);
__decorate([
    typeorm_1.Column({ name: "valid_since", type: "datetime" }),
    __metadata("design:type", Date)
], PricingEntity.prototype, "validSince", void 0);
PricingEntity = __decorate([
    typeorm_1.Entity('pricings')
], PricingEntity);
exports.PricingEntity = PricingEntity;
//# sourceMappingURL=pricing.entity.js.map