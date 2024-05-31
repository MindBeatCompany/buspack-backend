import { LocalityOnCreatePricingDto } from "./create-pricing-locality.dto";
export declare class CreateAreaDto {
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
    localities: LocalityOnCreatePricingDto[];
}
