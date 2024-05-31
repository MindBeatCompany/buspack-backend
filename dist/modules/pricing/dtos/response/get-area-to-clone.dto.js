"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaToCloneDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const area_entity_1 = require("../../entities/area.entity");
class AreaToCloneDto extends swagger_1.OmitType(area_entity_1.AreaEntity, ["pricing", "priceTable", "id"]) {
    constructor(area) {
        super();
        this.position = area.position;
        this.name = area.name;
        this.finalKilogramValue = area.finalKilogramValue;
        this.increasedWeight = area.increasedWeight;
        this.startingTariffPrice = area.startingTariffPrice;
        this.tariffPriceIncrease = area.tariffPriceIncrease;
        this.insurance = area.insurance;
        this.homeDelivery = area.homeDelivery;
        this.homeWithdrawal = area.homeWithdrawal;
        this.others = area.others;
        this.additionalPriceIncrease = area.additionalPriceIncrease;
        this.localities = area.localities;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.AreaToCloneDto = AreaToCloneDto;
//# sourceMappingURL=get-area-to-clone.dto.js.map