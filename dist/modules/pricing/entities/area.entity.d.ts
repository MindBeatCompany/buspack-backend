import { EnabledPlaceEntity } from "src/modules/enabled-places/entities/enabled-places.entity";
import { LocalityEntity } from "src/modules/enabled-places/entities/location.entity";
import { UpdatePricesDto } from "../dtos/request/update-prices.dto";
import { PricingEntity } from "./pricing.entity";
export declare class AreaEntity {
    id: number;
    position: number;
    name: string;
    finalKilogramValue: number;
    increasedWeight: number;
    startingTariffPrice: number;
    tariffPriceIncrease: number;
    insurance: number;
    homeDelivery: number;
    homeWithdrawal: number;
    others: number;
    additionalPriceIncrease: number;
    pricing: PricingEntity;
    priceTable: {
        maxWeight: any;
        basePrice: any;
        insurance: any;
        minWeight: any;
        homeDelivery: any;
        homeWithdrawal: any;
        others: any;
    }[];
    localities: LocalityEntity[];
    generatePriceTable(): void;
    updateCurrentPrices({ column, type, amount }: UpdatePricesDto): void;
    getPriceRowFrom(weight: number): {
        maxWeight: any;
        basePrice: any;
        insurance: any;
        minWeight: any;
        homeDelivery: any;
        homeWithdrawal: any;
        others: any;
    };
    containsLocality(enabledPlace: EnabledPlaceEntity): boolean;
    private updateColumnAmountFor;
    private updateValueFor;
    private isColumn;
}
