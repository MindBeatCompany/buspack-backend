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
const fs_1 = require("fs");
const xlsx_1 = require("xlsx");
const sr_file_reader_abstract_strategy_1 = require("./sr-file-reader-abstract-strategy");
const datatype_fields_1 = require("../../../../shared/datatype-fields");
class SpreadsheetReaderStrategy extends sr_file_reader_abstract_strategy_1.default {
    readFileAux(file, _a, fieldnamesPositions) {
        var options = __rest(_a, []);
        const header = this.getHeader(options.isThereAFsr, fieldnamesPositions);
        const workbook = xlsx_1.readFile(file.path);
        const sheetName = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetName[0]];
        let res = xlsx_1.utils.sheet_to_json(sheet, {
            header: header,
            range: "A2:Z100",
        });
        res = res.filter(row => Object.keys(row).length !== 3 &&
            row["locality"] !== '' &&
            row["province"] !== '' &&
            row["cpa"] !== '');
        const resAux = [];
        res.map(row => {
            let keys = Object.keys(row);
            let rowAux = {};
            keys.map(k => {
                if (k !== '')
                    rowAux[k] = row[k];
            });
            resAux.push(rowAux);
        });
        fs_1.unlinkSync(file.path);
        return res;
    }
    getHeader(isThereAFsr, fieldnamesPositions) {
        if (isThereAFsr) {
            return this.headerGetter.getCustomHeader(fieldnamesPositions);
        }
        else {
            return this.headerGetter.getDefaultHeader();
        }
    }
}
exports.default = SpreadsheetReaderStrategy;
//# sourceMappingURL=spreadsheet-reader-strategy.js.map