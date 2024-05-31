import { AreaEntity } from "../../entities/area.entity";
declare const AreaToCloneDto_base: import("@nestjs/common").Type<Omit<AreaEntity, "id" | "pricing" | "priceTable">>;
export declare class AreaToCloneDto extends AreaToCloneDto_base {
    constructor(area: AreaEntity);
}
export {};
