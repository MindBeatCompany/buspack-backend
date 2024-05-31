import { IsArray } from "class-validator";

export class PassResetDto {
  @IsArray()
  ids: number[];
}
