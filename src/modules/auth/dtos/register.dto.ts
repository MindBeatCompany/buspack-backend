import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  isActive?: boolean;

  @IsString()
  @MaxLength(128)
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsString()
  @MaxLength(128)
  @MinLength(8)
  @IsNotEmpty()
  repassword: string;

  @IsString()
  rol?: string;

  @IsInt()
  sessionTime?: number;
}
