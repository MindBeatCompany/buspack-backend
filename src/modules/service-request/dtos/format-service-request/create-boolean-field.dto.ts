
import { IsBoolean, IsInt, IsOptional } from "class-validator";

import { ValidatePositionDefaultValue } from "../../decorators/validate-position-default-value.decorator";

export default class CreateBooleanFieldDto {

    @IsOptional()
    @IsInt()
    position: number;

    @IsBoolean()
    required: boolean;

    @ValidatePositionDefaultValue("position", "boolean")
    defaultValue: boolean;
}
