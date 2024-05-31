import { IsInt, IsString } from "class-validator";

export class RoleCreatedDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
