import { IsEmail, IsString } from "class-validator";

export class AccountRecoveryDto {
  @IsString()
  userName: string;
}
