import { LocalityEntity } from "src/modules/enabled-places/entities/location.entity";
declare const MinimalLocalityDto_base: import("@nestjs/common").Type<Pick<LocalityEntity, "locality_name" | "province_name" | "zip_code">>;
export declare class MinimalLocalityDto extends MinimalLocalityDto_base {
}
export {};
