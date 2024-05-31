
import { OmitType } from "@nestjs/swagger";
import { PricingEntity } from "../../entities/pricing.entity";
import { AreaToCloneDto } from "./get-area-to-clone.dto";

export class PricingToCloneDto extends OmitType(PricingEntity,["lastAreaNumber", "account", "areas", "id"] as const) {
    
    areas: AreaToCloneDto[];

    constructor(pricing: PricingEntity) {
        super();
        this.name = pricing.name;
        this.validSince = pricing.validSince;
        this.areas = pricing.areas.map(it => new AreaToCloneDto(it));
    }
}
