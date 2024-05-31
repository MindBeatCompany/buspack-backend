import { IsBoolean, IsInt, IsString } from "class-validator";

export class AccountCreatedDto {
  @IsInt()
  id: number;

  @IsString()
  companyName: string;

  @IsString()
  codeECO: string;

  @IsString()
  accountType: string;

  @IsString()
  filePath:string
}
