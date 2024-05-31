import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams, Type } from "class-transformer"
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator"
import { CreateAreaDto } from "./create-area.dto"

export class CreatePricingDto {

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @ApiProperty({ example: "TARIFARIO NUEVO" })
    name: string;

    @Type(() => Date)
    @IsDate()
    validSince: Date

    @IsArray()
    @ArrayMinSize(1)
    @ArrayMaxSize(8)
    @ValidateNested({ each: true })
    @Type(() => CreateAreaDto)
    areas: CreateAreaDto[];

    @IsInt()
    @Min(1)
    accountId: number;
}
