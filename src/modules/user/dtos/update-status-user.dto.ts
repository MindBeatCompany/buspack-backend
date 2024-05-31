import { PartialType, PickType } from "@nestjs/swagger";
import { IsArray } from "class-validator";

import { UserCreatedDto } from "./user-created.dto";

export class UpdateStatusUserDto extends PartialType(
  PickType(UserCreatedDto, ["isActive"])
) {
  @IsArray()
  ids: number[];
}
