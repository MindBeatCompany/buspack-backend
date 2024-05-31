import { IsEnum, IsInt, Min } from "class-validator";
import { ColumnPricingToUpdate } from "../../enums/column-pricing-to-update.enum";
import UpdatePricingType from "../../enums/update-pricing-type.enum";

export class UpdatePricesDto {

    @IsEnum(ColumnPricingToUpdate)
    column: ColumnPricingToUpdate;

    @IsEnum(UpdatePricingType)
    type: UpdatePricingType;

    @Min(0)
    @IsInt()
    amount: number;
}


