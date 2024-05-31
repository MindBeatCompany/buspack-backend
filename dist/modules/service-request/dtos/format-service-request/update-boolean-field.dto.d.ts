import CreateBooleanField from "./create-boolean-field.dto";
declare const UpdateBooleanFieldDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateBooleanField, "defaultValue">>>;
export default class UpdateBooleanFieldDto extends UpdateBooleanFieldDto_base {
    defaultValue: boolean;
}
export {};
