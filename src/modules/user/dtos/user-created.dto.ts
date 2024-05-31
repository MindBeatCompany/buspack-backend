import { IsBoolean, IsDate, IsEmail, IsInt, IsString } from "class-validator";
import { AccountCreatedDto } from "src/modules/account/dtos";
import { RoleCreatedDto } from "src/modules/role/dtos";

export class UserCreatedDto {
  @IsInt()
  id: number;

  @IsString()
  userName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isActive: boolean;

  role: RoleCreatedDto;

  account: AccountCreatedDto;

  @IsInt()
  sessionTime: number;

  @IsDate()
  createdAt: Date;
}
