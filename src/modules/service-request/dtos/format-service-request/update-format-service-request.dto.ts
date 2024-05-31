
import { IsInt } from "class-validator";
import { PartialType, OmitType } from "@nestjs/mapped-types";
import { ValidateNested} from "class-validator";
import { Type } from "class-transformer";

import { CreateFormatServiceRequestDto } from "./create-format-service-request.dto";
import UpdateRequestFieldsDto from "./update-request-fields.dto";

export default class UpdateFormatServiceRequestDto 
    extends PartialType(OmitType(CreateFormatServiceRequestDto, ["accountId", "requestFields"] as const)) {

    @IsInt()
    accountId: number

    @ValidateNested()
    @Type(() => UpdateRequestFieldsDto)
    requestFields: UpdateRequestFieldsDto;
}
