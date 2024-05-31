import { IsString, IsUppercase, MaxLength, Min } from 'class-validator';

export class CreateRolDto {
  @IsString()
  @MaxLength(12)
  @Min(3)
  @IsUppercase()
  name: string;
}
