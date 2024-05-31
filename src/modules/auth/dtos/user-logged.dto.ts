import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";
import { AccountCreatedDto } from "src/modules/account/dtos";
import { AccountEntity } from "src/modules/account/entities/account.entity";

export class UserLoggedDto {
  @IsInt()
  id: number;
  @IsString()
  userName: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsBoolean()
  isActive: boolean;
  @IsBoolean()
  firstTimeLogged: boolean;
  @IsInt()
  sessionTime: number;
  @IsDate()
  createdAt: Date;
  @IsString()
  companyName: string;
  @IsString()
  codeECO: string;
  account: AccountCreatedDto;
  @IsString()
  roles: string;
  @IsString()
  token: string;
}
