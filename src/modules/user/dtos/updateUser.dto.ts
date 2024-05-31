import { CreateUserDto } from "./createUser.dto";
import { PartialType } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsBoolean()
  passReset: boolean;
}
