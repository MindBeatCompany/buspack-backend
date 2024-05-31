"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingToCloneDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const pricing_entity_1 = require("../../entities/pricing.entity");
const get_area_to_clone_dto_1 = require("./get-area-to-clone.dto");
class PricingToCloneDto extends swagger_1.OmitType(pricing_entity_1.PricingEntity, ["lastAreaNumber", "account", "areas", "id"]) {
    constructor(pricing) {
        super();
        this.name = pricing.name;
        this.validSince = pricing.validSince;
        this.areas = pricing.areas.map(it => new get_area_to_clone_dto_1.AreaToCloneDto(it));
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { areas: { required: true, type: () => [require("./get-area-to-clone.dto").AreaToCloneDto] } };
    }
}
exports.PricingToCloneDto = PricingToCloneDto;
//# sourceMappingURL=get-pricing-to-clone.dto.js.map