import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Max, Min, ValidateNested } from "class-validator";
import { LocalityOnCreatePricingDto } from "./create-pricing-locality.dto";

export class CreateAreaDto {

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty({ example: "AMBA" })
    name: string;

    @Min(1)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 100 })
    finalKilogramValue: number;

    @Min(1)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 20 })
    increasedWeight: number;

    @Min(0)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 1100 })
    startingTariffPrice: number;

    @Min(0)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 600 })
    tariffPriceIncrease: number;

    @Min(0)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 780 })
    insurance: number;

    @Min(0)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 745 })
    homeDelivery: number;

    @Min(0)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 300 })
    homeWithdrawal: number;

    @Min(0)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 800 })
    others: number;

    @Min(0)
    @Max(8388607)
    @IsInt()
    @ApiProperty({ example: 220 })
    additionalPriceIncrease: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => LocalityOnCreatePricingDto)
    localities: LocalityOnCreatePricingDto[];
}
