import { IsInt } from "class-validator";

export class PreferenceUserDto {
  @IsInt()
  sessionTime: number;
}
