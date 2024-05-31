"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const header_getter_1 = require("../header-getter");
const datatype_fields_1 = require("../../../../shared/datatype-fields");
class SRFileReaderAbstractStrategy {
    constructor() {
        this.headerGetter = new header_getter_1.default();
    }
    async readFile(file, _a, fieldnamesPositions) {
        var options = __rest(_a, []);
        let res = await this.readFileAux(file, options, fieldnamesPositions);
        return this.fillUndefinedFieldsWithNull(res);
    }
    fillUndefinedFieldsWithNull(rows) {
        const allFields = datatype_fields_1.stringFields.concat(datatype_fields_1.numberFields).concat(datatype_fields_1.booleanFields);
        let res = [];
        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            allFields.map(f => {
                if (row[f] === undefined)
                    row[f] = null;
            });
            res = res.concat(row);
        }
        return res;
    }
}
exports.default = SRFileReaderAbstractStrategy;
//# sourceMappingURL=sr-file-reader-abstract-strategy.js.map