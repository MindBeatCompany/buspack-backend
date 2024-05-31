import { EnabledPlaceEntity } from "./enabled-places.entity";
export declare class LocalityEntity {
    idlocality: number;
    zip_code: number;
    province_name: string;
    locality_name: string;
    enabled_place: string;
    isActive: boolean;
    isEq(enabledPlace: EnabledPlaceEntity): boolean;
}
