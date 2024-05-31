"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = require("xlsx");
class LocalityFormatFileReader {
    readFile(file) {
        const workbook = xlsx_1.readFile(file.path);
        const sheetNames = workbook.SheetNames;
        const firstSheet = workbook.Sheets[sheetNames[0]];
        var res = xlsx_1.utils.sheet_to_json(firstSheet, {
            header: this.getHeader(),
            range: "A3:H660"
        });
        return res;
    }
    getHeader() {
        return [
            "idog",
            null,
            null,
            null,
            null,
            "locality",
            "province",
            "cp"
        ];
    }
}
exports.default = LocalityFormatFileReader;
//# sourceMappingURL=locality-format-file-reader.js.map