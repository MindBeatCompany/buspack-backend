import { IsBoolean, IsDate, IsDecimal, isDecimal, isInt, IsInt, IsString } from "class-validator";

export class QueryServiceRequestDto {

  @IsString()
  pieceId: string;

  @IsString()
  createdAt: String;

  @IsString()
  requestId: string;

  @IsString()
  recipientFullname: string;

  @IsString()
  address: string;

  @IsString()
  addressNumber: string;

  @IsString()
  cpa: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsString()
  envio: string;

  @IsInt()
  caja: number;

  @IsString()
  voucher: string;

  @IsString()
  estado: string;


}
