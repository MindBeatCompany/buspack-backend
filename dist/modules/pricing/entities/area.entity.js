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
exports.AreaEntity = void 0;
const openapi = require("@nestjs/swagger");
const enabled_places_entity_1 = require("../../enabled-places/entities/enabled-places.entity");
const location_entity_1 = require("../../enabled-places/entities/location.entity");
const typeorm_1 = require("typeorm");
const column_pricing_to_update_enum_1 = require("../enums/column-pricing-to-update.enum");
const update_pricing_type_enum_1 = require("../enums/update-pricing-type.enum");
const pricing_entity_1 = require("./pricing.entity");
let AreaEntity = class AreaEntity {
    generatePriceTable() {
        const priceTable = [];
        let actualWeight = 0;
        let actualPrice = this.startingTariffPrice;
        let actualInsurance = this.insurance;
        let actualHomeDelivery = this.homeDelivery;
        let actualHomeWithdrawal = this.homeWithdrawal;
        let actualOthers = this.others;
        while (actualWeight < this.finalKilogramValue) {
            const newRow = {
                maxWeight: null,
                basePrice: null,
                insurance: null,
                minWeight: null,
                homeDelivery: null,
                homeWithdrawal: null,
                others: null,
            };
            newRow.minWeight = actualWeight;
            newRow.maxWeight = actualWeight + this.increasedWeight;
            newRow.basePrice = actualPrice;
            newRow.insurance = actualInsurance;
            newRow.homeDelivery = actualHomeDelivery;
            newRow.homeWithdrawal = actualHomeWithdrawal;
            newRow.others = actualOthers;
            priceTable.push(newRow);
            actualWeight = actualWeight + this.increasedWeight;
            actualPrice = actualPrice + this.tariffPriceIncrease;
            actualInsurance = actualInsurance + this.additionalPriceIncrease;
            actualHomeDelivery = actualHomeDelivery + this.additionalPriceIncrease;
            actualHomeWithdrawal = actualHomeWithdrawal + this.additionalPriceIncrease;
            actualOthers = actualOthers + this.additionalPriceIncrease;
        }
        priceTable[priceTable.length - 1].maxWeight = this.finalKilogramValue;
        this.priceTable = priceTable;
    }
    updateCurrentPrices({ column, type, amount }) {
        if (this.isColumn(column, column_pricing_to_update_enum_1.ColumnPricingToUpdate.ADDITIONAL_INCREASE)) {
            this.additionalPriceIncrease += type === update_pricing_type_enum_1.default.FIXED_AMOUNT ?
                amount :
                Math.floor(this.additionalPriceIncrease * (amount / 100));
        }
        if (this.isColumn(column, column_pricing_to_update_enum_1.ColumnPricingToUpdate.TARIFF_INCREASE)) {
            this.tariffPriceIncrease += type === update_pricing_type_enum_1.default.FIXED_AMOUNT ?
                amount :
                Math.floor(this.tariffPriceIncrease * (amount / 100));
        }
        if (this.isColumn(column, column_pricing_to_update_enum_1.ColumnPricingToUpdate.TARIFF)) {
            this.startingTariffPrice += type === update_pricing_type_enum_1.default.FIXED_AMOUNT ?
                amount :
                Math.floor(this.startingTariffPrice * (amount / 100));
        }
        if (this.isColumn(column, column_pricing_to_update_enum_1.ColumnPricingToUpdate.HOME_DELIVERY)) {
            this.homeDelivery += type === update_pricing_type_enum_1.default.FIXED_AMOUNT ?
                amount :
                Math.floor(this.homeDelivery * (amount / 100));
        }
        if (this.isColumn(column, column_pricing_to_update_enum_1.ColumnPricingToUpdate.HOME_WITHDRAWAL)) {
            this.homeWithdrawal += type === update_pricing_type_enum_1.default.FIXED_AMOUNT ?
                amount :
                Math.floor(this.homeWithdrawal * (amount / 100));
        }
        if (this.isColumn(column, column_pricing_to_update_enum_1.ColumnPricingToUpdate.INSURANCE)) {
            this.insurance += type === update_pricing_type_enum_1.default.FIXED_AMOUNT ?
                amount :
                Math.floor(this.insurance * (amount / 100));
        }
        if (this.isColumn(column, column_pricing_to_update_enum_1.ColumnPricingToUpdate.OTHERS)) {
            this.others += type === update_pricing_type_enum_1.default.FIXED_AMOUNT ?
                amount :
                Math.floor(this.others * (amount / 100));
        }
        this.generatePriceTable();
    }
    getPriceRowFrom(weight) {
        const rowPrice = this.priceTable.find(row => weight >= row.minWeight && weight <= row.maxWeight);
        return rowPrice ? rowPrice : null;
    }
    containsLocality(enabledPlace) {
        return this.localities.some(locality => locality.isEq(enabledPlace));
    }
    updateColumnAmountFor(column, currentColumn, tableColumn, type, amount) {
        if (this.isColumn(column, currentColumn)) {
            this.updateValueFor(tableColumn, type, amount);
        }
    }
    updateValueFor(atribute, type, amount) {
        this.priceTable.forEach(it => {
            it[atribute] += type === update_pricing_type_enum_1.default.FIXED_AMOUNT ?
                amount :
                Math.floor(it[atribute] * (amount / 100));
        });
    }
    isColumn(currentColumn, comparedColumn) {
        return currentColumn === comparedColumn || currentColumn === column_pricing_to_update_enum_1.ColumnPricingToUpdate.ALL;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, position: { required: true, type: () => Number }, name: { required: true, type: () => String }, finalKilogramValue: { required: true, type: () => Number }, increasedWeight: { required: true, type: () => Number }, startingTariffPrice: { required: true, type: () => Number }, tariffPriceIncrease: { required: true, type: () => Number }, insurance: { required: true, type: () => Number }, homeDelivery: { required: true, type: () => Number }, homeWithdrawal: { required: true, type: () => Number }, others: { required: true, type: () => Number }, additionalPriceIncrease: { required: true, type: () => Number }, pricing: { required: true, type: () => require("./pricing.entity").PricingEntity }, priceTable: { required: true }, localities: { required: true, type: () => [require("../../enabled-places/entities/location.entity").LocalityEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AreaEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], AreaEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: "final_kilogram_value", type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "finalKilogramValue", void 0);
__decorate([
    typeorm_1.Column({ name: "increased_weight", type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "increasedWeight", void 0);
__decorate([
    typeorm_1.Column({ name: "starting_price_tariff", type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "startingTariffPrice", void 0);
__decorate([
    typeorm_1.Column({ name: "tariff_price_increase", type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "tariffPriceIncrease", void 0);
__decorate([
    typeorm_1.Column({ type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "insurance", void 0);
__decorate([
    typeorm_1.Column({ name: "home_delivery", type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "homeDelivery", void 0);
__decorate([
    typeorm_1.Column({ name: "home_withdrawal", type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "homeWithdrawal", void 0);
__decorate([
    typeorm_1.Column({ type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "others", void 0);
__decorate([
    typeorm_1.Column({ name: "additional_price_increase", type: "mediumint" }),
    __metadata("design:type", Number)
], AreaEntity.prototype, "additionalPriceIncrease", void 0);
__decorate([
    typeorm_1.ManyToOne(() => pricing_entity_1.PricingEntity, () => (pricing) => pricing.areas, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: "pricing_id" }),
    __metadata("design:type", pricing_entity_1.PricingEntity)
], AreaEntity.prototype, "pricing", void 0);
__decorate([
    typeorm_1.Column({
        type: "json",
        name: "price_table"
    }),
    __metadata("design:type", Array)
], AreaEntity.prototype, "priceTable", void 0);
__decorate([
    typeorm_1.ManyToMany(() => location_entity_1.LocalityEntity, {
        eager: true,
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], AreaEntity.prototype, "localities", void 0);
AreaEntity = __decorate([
    typeorm_1.Entity('areas')
], AreaEntity);
exports.AreaEntity = AreaEntity;
//# sourceMappingURL=area.entity.js.map