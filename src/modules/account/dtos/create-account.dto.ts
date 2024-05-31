import { IsBoolean, IsInt, IsString, IsOptional } from "class-validator";

export class CreateAccountDto {
  @IsString()
  companyName: string;

  @IsString()
  codeECO: string;

  @IsString()
  accountType: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  filePath: string;

  @IsOptional()
  @IsString()
  idClientEntity: string;

  @IsOptional()
  @IsString()
  idClientAgent: string;

  @IsOptional()
  @IsString()
  addressStreet: string;

  @IsOptional()
  @IsString()
  addressNumber: string;

  @IsOptional()
  @IsString()
  addressFloor: string;

  @IsOptional()
  @IsString()
  addressApartment: string;

  @IsOptional()
  @IsString()
  addressBuilding: string;

  @IsOptional()
  @IsString()
  locality: string;

  @IsOptional()
  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  cuil: string;
}
