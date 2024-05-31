
import { IsString,  ValidateNested,ArrayNotEmpty, IsOptional, IsNumber  } from "class-validator";
import { IsNull } from "typeorm";
import { CreateUserDto } from "./createUser.dto";



export class CreateMultiUserDto {
  @IsString()
  companyName: string;

  @IsNumber()
  @IsOptional()
  idClientEntity: number;

  @IsNumber()
  @IsOptional()
  idClientAgent: number;

  @IsString()
  cuit: string;

  @IsString()
  addressStreet: string;

  @IsString()
  addressNumber: string;

  @IsString()
  addressBuilding: string;

  @IsString()
  addressFloor: string;

  @IsString()
  addressApartment: string;

  @IsString()
  locality: string;

  @IsString()
  province: string;

  @IsString()
  country: string;

  @IsString()
  accountType: string;

  @IsString()
  codeEco: string;

  @IsString()
  @IsOptional()
  filePath:string;
    
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  users: CreateUserDto[];
}
