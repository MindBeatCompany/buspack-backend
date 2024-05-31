import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class LocalityOnCreatePricingDto {
    
    @IsInt()
    @ApiProperty({example: 1888})
    zipCode: number;

    @IsNotEmpty()
    @ApiProperty({example: "FLORENCIO VARELA"})
    name: string;
}