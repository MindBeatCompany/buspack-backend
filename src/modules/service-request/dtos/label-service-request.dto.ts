import { IsBoolean, IsDate, IsDecimal, isDecimal, isInt, IsInt, IsString } from "class-validator";

export class LabelServiceRequestDto {

  @IsString()
  pieceId: String;

  @IsString()
  recipientFullname: string;

  @IsString()
  address: string;

  @IsString()
  cpa: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsString()
  requestId: string;

  @IsString()
  shipping: string;

  @IsString()
  voucher: string;

  @IsString()
  status: string;

  @IsString()
  phone: string;

  @IsString()
  observations: string;

}
