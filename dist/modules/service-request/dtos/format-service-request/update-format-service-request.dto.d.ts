import { CreateFormatServiceRequestDto } from "./create-format-service-request.dto";
import UpdateRequestFieldsDto from "./update-request-fields.dto";
declare const UpdateFormatServiceRequestDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateFormatServiceRequestDto, "accountId" | "requestFields">>>;
export default class UpdateFormatServiceRequestDto extends UpdateFormatServiceRequestDto_base {
    accountId: number;
    requestFields: UpdateRequestFieldsDto;
}
export {};
