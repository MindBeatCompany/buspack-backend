import { IsDefined, IsString, Matches, MinLength } from "class-validator";

export class UpdatePasswordDto {
  @IsString()
  @IsDefined()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~])[A-Za-z\d!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]{8,}$/
  )
  newPass: string;

  @IsString()
  @IsDefined()
  oldPass: string;
}
