
import { OmitType } from "@nestjs/swagger";
import { AreaEntity } from "../../entities/area.entity";

export class AreaToCloneDto extends OmitType(AreaEntity, ["pricing", "priceTable", "id"] as const) {

    constructor(area: AreaEntity) {
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
}
