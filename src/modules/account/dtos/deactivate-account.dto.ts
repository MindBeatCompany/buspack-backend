import { IsArray, IsBoolean, IsInt } from "class-validator";

export class DeactivateAccountDto {
  @IsBoolean()
  isActive: boolean;

  @IsArray()
  ids: number[];
}
