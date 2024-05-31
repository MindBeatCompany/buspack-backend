"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EntityFieldToFsrMapper {
    static map(fieldStringRows, fieldNumberRows, fieldBooleanRows, formatSr) {
        let res = {};
        res['format'] = formatSr.format;
        res['separator'] = formatSr.separator;
        res['quoteChar'] = formatSr.quoteChar;
        res['requestFields'] = this.getRequestFields(fieldStringRows, fieldNumberRows, fieldBooleanRows);
        return res;
    }
    static getRequestFields(fieldStringRows, fieldNumberRows, fieldBooleanRows) {
        let res = {};
        const allFieldRows = [...fieldStringRows, ...fieldNumberRows, ...fieldBooleanRows];
        allFieldRows.map(fr => {
            var requestField = {
                "required": fr.required,
                "position": fr.position !== null ? fr.position + 1 : null,
                "defaultValue": fr.defaultValue
            };
            const length = fr.length;
            if (length !== undefined) {
                requestField = Object.assign(Object.assign({}, requestField), { "length": length });
            }
            res[fr.fieldName] = requestField;
        });
        return res;
    }
}
exports.default = EntityFieldToFsrMapper;
//# sourceMappingURL=entity-field-to-fsr-mapper.js.map