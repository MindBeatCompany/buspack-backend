import { IsInt, IsString } from "class-validator";

export class AccountTypeTariffDto {
  @IsInt()
  id: number;

  @IsString()
  tariffType: string;

}