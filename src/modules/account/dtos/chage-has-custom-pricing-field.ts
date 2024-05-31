import { IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ChangeHasCustomPricingFieldRequest {
  @IsBoolean()
  @ApiProperty({ example: true })
  hasCustom: boolean;
}
