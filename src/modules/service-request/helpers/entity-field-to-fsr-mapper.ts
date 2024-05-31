
import FieldBooleanEntity from "../entities/field-boolean-sr.entity";
import FieldNumberEntity from "../entities/field-number-sr.entity";
import FieldStringEntity from "../entities/field-string-sr.entity";
import FormatServiceRequestEntity from "../entities/format-sr.entity";


export default class EntityFieldToFsrMapper {

    public static  map(fieldStringRows: FieldStringEntity[], 
                       fieldNumberRows: FieldNumberEntity[],
                       fieldBooleanRows: FieldBooleanEntity[],
                       formatSr: FormatServiceRequestEntity) {
        
        let res = {}

        res['format'] = formatSr.format;
        res['separator'] = formatSr.separator;
        res['quoteChar'] = formatSr.quoteChar;
        res['requestFields'] = this.getRequestFields(fieldStringRows, fieldNumberRows, fieldBooleanRows)

        return res;               

    }

    private static getRequestFields(fieldStringRows: FieldStringEntity[], 
                                    fieldNumberRows: FieldNumberEntity[], 
                                    fieldBooleanRows: FieldBooleanEntity[]): any {
        let res = {}

        const allFieldRows: any[] = [...fieldStringRows, ...fieldNumberRows, ...fieldBooleanRows];
        allFieldRows.map(fr => {
            var requestField: any = {
                "required": fr.required,
                "position": fr.position !== null ? fr.position + 1 : null,
                "defaultValue": fr.defaultValue
            }

            const length = fr.length
            if (length !== undefined) {
                requestField = {...requestField, "length": length}
            }

            res[fr.fieldName] = requestField;
        })
        
        return res
    }
}
