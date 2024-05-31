import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAppMenuDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsArray()
  @MaxLength(20, {
    each: true,
  })
  roles: string[];

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  menuParent?: string;
}
