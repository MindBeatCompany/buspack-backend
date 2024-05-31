import { IsBoolean, IsDecimal, isDecimal, isInt, IsInt, IsString } from "class-validator";

export class CreateServiceRequestDto {

  @IsString()
  id: string;

  @IsString()
  recipient: string;

  @IsString()
  docType: string;

  @IsString()
  docNumber: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsString()
  addressNumber: string;

  @IsString()
  addressBuil: string;

  @IsString()
  addressFloor: string;

  @IsString()
  addressApartment: string;

  @IsString()
  enabledPlace: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsString()
  cpa: string;

  @IsInt()
  pieces: number;

  @IsDecimal()
  weight: number;

  @IsBoolean()
  homeDelivery: boolean;

  @IsString()
  obs: string;
}
