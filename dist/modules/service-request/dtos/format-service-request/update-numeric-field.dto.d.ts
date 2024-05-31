import CreateNumericFieldDto from "./create-numeric-field.dto";
declare const UpdateNumericFieldDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateNumericFieldDto, "defaultValue">>>;
export default class UpdateNumericFieldDto extends UpdateNumericFieldDto_base {
    defaultValue: any;
}
export {};
