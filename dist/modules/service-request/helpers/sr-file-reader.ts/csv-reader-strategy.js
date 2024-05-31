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
const csv_parse_1 = require("csv-parse");
const detect_file_encoding_1 = require("../detect-file-encoding");
const sr_file_reader_abstract_strategy_1 = require("./sr-file-reader-abstract-strategy");
class CsvReaderStrategy extends sr_file_reader_abstract_strategy_1.default {
    async readFileAux(file, _a, fieldnamePositions) {
        var options = __rest(_a, []);
        const separator = options.separator;
        const quoteChar = options.quoteChar;
        const header = this.headerGetter.getCustomHeader(fieldnamePositions);
        const delimiter = this.getDelimiter(separator);
        const encoding = await this.getFileEncoding(options.filePath);
        let res = [];
        return new Promise((resolve, reject) => {
            fs_1.createReadStream(file.path)
                .pipe(csv_parse_1.parse({ delimiter: delimiter,
                skip_empty_lines: true,
                from_line: 2,
                trim: true,
                relax_column_count: true,
                quote: quoteChar,
                encoding: encoding,
                cast: function (value, context) {
                    let res = null;
                    let vCastedToN = Number(value);
                    if (Object.is(vCastedToN, NaN)) {
                        res = value;
                    }
                    else {
                        res = vCastedToN;
                    }
                    if (Object.is(value, ""))
                        res = null;
                    return res;
                }
            }))
                .on("data", function (row) {
                let rl = row.length;
                const hl = header.length;
                if (rl < hl) {
                    const diffHlAndRl = hl - rl;
                    for (let i = 0; i < diffHlAndRl; i++) {
                        row.push(null);
                    }
                }
                rl = row.length;
                let sr = {};
                for (let i = 0; i < hl; i++) {
                    let he = header[i];
                    let value = row[i];
                    if (he !== "")
                        sr[he] = value;
                }
                res.push(sr);
            })
                .on("error", function (error) {
                reject(error);
            })
                .on("end", function () {
                resolve(res);
            });
        });
    }
    getDelimiter(separator) {
        let delimiter = null;
        switch (separator) {
            case "comma": {
                delimiter = ",";
                break;
            }
            case "semicolon": {
                delimiter = ";";
                break;
            }
            case "tab": {
                delimiter = "\t";
                break;
            }
            case "doubleComma": {
                delimiter = "\"";
                break;
            }
        }
        return delimiter;
    }
    async getFileEncoding(filePath) {
        const encoding = await detect_file_encoding_1.detectFileEncoding(filePath);
        let result = null;
        switch (encoding) {
            case "UTF-16LE": {
                result = "utf16le";
                break;
            }
            case "CP1250": {
                result = "latin1";
                break;
            }
            case null: {
                result = "latin1";
                break;
            }
            default: {
                result = "utf8";
                break;
            }
        }
        return result;
    }
}
exports.default = CsvReaderStrategy;
//# sourceMappingURL=csv-reader-strategy.js.map