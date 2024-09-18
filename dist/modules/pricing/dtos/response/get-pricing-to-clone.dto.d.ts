import { PricingEntity } from "../../entities/pricing.entity";
import { AreaToCloneDto } from "./get-area-to-clone.dto";
declare const PricingToCloneDto_base: import("@nestjs/common").Type<Omit<PricingEntity, "id" | "account" | "areas" | "lastAreaNumber">>;
export declare class PricingToCloneDto extends PricingToCloneDto_base {
    areas: AreaToCloneDto[];
    constructor(pricing: PricingEntity);
}
export {};
