
import { PartialType, OmitType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";

import CreateNumericFieldDto from "./create-numeric-field.dto";

export default class UpdateNumericFieldDto extends PartialType(OmitType(CreateNumericFieldDto, ["defaultValue"] as const)) {

    @IsOptional()
    defaultValue: any;
}
