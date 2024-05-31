import { CreateAreaDto } from "./create-area.dto";
export declare class CreatePricingDto {
    name: string;
    validSince: Date;
    areas: CreateAreaDto[];
    accountId: number;
}
