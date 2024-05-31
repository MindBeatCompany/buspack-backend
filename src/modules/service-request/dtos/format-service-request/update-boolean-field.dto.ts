
import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional } from "class-validator";

import CreateBooleanField from "./create-boolean-field.dto";

export default class UpdateBooleanFieldDto extends PartialType(OmitType(CreateBooleanField, ["defaultValue"] as const)) {

    @IsOptional()
    @IsBoolean()
    defaultValue: boolean;
}
