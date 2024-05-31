import { AccountEntity } from "src/modules/account/entities/account.entity";
import { EnabledPlaceEntity } from "src/modules/enabled-places/entities/enabled-places.entity";
import { UpdatePricesDto } from "../dtos/request/update-prices.dto";
import { AreaEntity } from "./area.entity";
export declare class PricingEntity {
    id: number;
    name: string;
    lastAreaNumber: number;
    areas: AreaEntity[];
    account: AccountEntity;
    validSince: Date;
    addArea(newArea: AreaEntity): void;
    updateCurrentPrices(updatePricesRequest: UpdatePricesDto): PricingEntity;
    getAreaFromEnabledPlace(enabledPlace: EnabledPlaceEntity): AreaEntity;
}
