import { PreferenceUserDto } from "./preferenceUser.dto";
import { PartialType } from "@nestjs/swagger";

export class UpdatePreferenceDto extends PartialType(PreferenceUserDto) {}
