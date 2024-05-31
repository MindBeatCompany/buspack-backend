import { ColumnPricingToUpdate } from "../../enums/column-pricing-to-update.enum";
import UpdatePricingType from "../../enums/update-pricing-type.enum";
export declare class UpdatePricesDto {
    column: ColumnPricingToUpdate;
    type: UpdatePricingType;
    amount: number;
}
