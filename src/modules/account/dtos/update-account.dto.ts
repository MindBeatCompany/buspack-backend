import { OmitType, PartialType, PickType } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { CreateAccountDto } from "./create-account.dto";

export class UpdateAccountDto extends PickType(CreateAccountDto, [
  "companyName",
  "codeECO",
  "filePath",
  "tariffType",
]) {}
