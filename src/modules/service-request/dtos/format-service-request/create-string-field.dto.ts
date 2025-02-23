
import { IsBoolean, IsInt, IsOptional } from "class-validator";

import { ValidatePositionDefaultValue } from "../../decorators/validate-position-default-value.decorator";

export default class CreateStringFieldDto {

    @IsOptional()
    @IsInt()
    position: number;

    @IsBoolean()
    required: boolean;

    @IsInt()
    length: number;

    @ValidatePositionDefaultValue("position", "string")
    defaultValue: string;
}
