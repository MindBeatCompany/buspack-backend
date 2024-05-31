import {
  IsString,
  MaxLength,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsBoolean,
} from "class-validator";
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  userName: string;

  @IsString()
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MaxLength(255)
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  rol: number;

  @IsBoolean()
  isActive: boolean;
}
