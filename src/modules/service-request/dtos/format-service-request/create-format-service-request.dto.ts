
import { IsAscii, IsInt, IsString, MaxLength, MinLength, Validate, ValidateNested } from "class-validator";
import { FormatValidator } from "src/shared/validators/format-validator";
import { SeparatorValidator } from "src/shared/validators/separator-validator";
import { Type } from "class-transformer";

import CreateRequestFieldsDto from "./create-request-fields.dto";
import { ValidateFormatSeparator } from "../../decorators/validate-format-separator.decorator";

export class CreateFormatServiceRequestDto {

    @ValidateFormatSeparator("format", "separator")
    @Validate(FormatValidator)
    format: string;

    @Validate(SeparatorValidator)
    @ValidateFormatSeparator("format", "separator")
    separator: string;

    @IsInt()
    accountId: number

    @ValidateNested()
    @Type(() => CreateRequestFieldsDto)
    requestFields: CreateRequestFieldsDto;

    @IsString()
    @MinLength(1)
    @MaxLength(1)
    @IsAscii()
    quoteChar: string
}
