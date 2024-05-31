
import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsString, IsOptional } from "class-validator"

import CreateStringField from "./create-string-field.dto";

export default class UpdateStringFieldDto extends PartialType(OmitType(CreateStringField, ["defaultValue"] as const)) {

    @IsOptional()
    @IsString()
    defaultValue: string;
}
