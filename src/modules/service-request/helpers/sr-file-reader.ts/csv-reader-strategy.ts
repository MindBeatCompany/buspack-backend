
import { createReadStream} from "fs";
import { parse } from "csv-parse";
import { detectFileEncoding } from "../detect-file-encoding";

import SRFileReaderAbstractStrategy from "./sr-file-reader-abstract-strategy";


export default class CsvReaderStrategy extends SRFileReaderAbstractStrategy {

    public async readFileAux(file: any, {...options}, fieldnamePositions: any) {
        const separator = options.separator;
        const quoteChar = options.quoteChar;
        const header = this.headerGetter.getCustomHeader(fieldnamePositions);
        const delimiter = this.getDelimiter(separator);
        const encoding = await this.getFileEncoding(options.filePath);

        let res = [];

        return new Promise((resolve, reject) => {
            createReadStream(file.path)
                .pipe(parse({ delimiter: delimiter,
                            skip_empty_lines: true,
                            from_line: 2,
                            trim: true,
                            relax_column_count: true,
                            quote: quoteChar,
                            encoding: encoding,
                            cast: function(value, context) {
                                let res = null;
                                let vCastedToN = Number(value)

                                if (Object.is(vCastedToN, NaN)) {
                                    res = value
                                } else {
                                    res = vCastedToN;
                                }
                                if (Object.is(value, "")) res = null;

                                return res;
                            }
                }))
                .on("data", function(row) {
                    // si el ancho de la fila (row) es menor al header, se completa la row con null
                    // hasta alcanzar el ancho del header
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
                        // he = header element
                        let he = header[i];
                        let value = row[i];
                        if (he !== "") sr[he] = value;
                    }

                    res.push(sr);
                })
                .on("error", function (error) {
                    reject(error);
                })
                .on("end", function() {
                    resolve(res);
                });
        });
    }

    private getDelimiter(separator: any) {
        let delimiter = null;

        switch(separator) {
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
                delimiter = "\""
                break;
            }
        }

        return delimiter;
    }

    private async getFileEncoding(filePath: any) {
        const encoding = await detectFileEncoding(filePath);
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
