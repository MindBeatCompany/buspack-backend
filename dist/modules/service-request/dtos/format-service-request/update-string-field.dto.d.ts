import CreateStringField from "./create-string-field.dto";
declare const UpdateStringFieldDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<CreateStringField, "defaultValue">>>;
export default class UpdateStringFieldDto extends UpdateStringFieldDto_base {
    defaultValue: string;
}
export {};
