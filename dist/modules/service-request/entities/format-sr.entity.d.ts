import FieldStringEntity from "./field-string-sr.entity";
import FieldNumberEntity from "./field-number-sr.entity";
import FieldBooleanEntity from "./field-boolean-sr.entity";
export default class FormatServiceRequestEntity {
    id: number;
    format: string;
    separator: string;
    accountId: number;
    stringFields: FieldStringEntity[];
    numericFields: FieldNumberEntity[];
    booleanFields: FieldBooleanEntity[];
    quoteChar: string;
}
