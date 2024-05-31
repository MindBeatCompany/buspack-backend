
import { unlinkSync } from "fs";

import { readFile, utils } from "xlsx";

import SRFileReaderAbstractStrategy from "./sr-file-reader-abstract-strategy";
import { stringFields, numberFields, booleanFields } from "src/shared/datatype-fields";


export default class SpreadsheetReaderStrategy extends SRFileReaderAbstractStrategy {

    public readFileAux(file: any, { ...options }: { [x: string]: any; }, fieldnamesPositions: any[]) {
        const header = this.getHeader(options.isThereAFsr, fieldnamesPositions);
        const workbook = readFile(file.path);
        const sheetName = workbook.SheetNames;
        const sheet = workbook.Sheets[sheetName[0]];

        let res = utils.sheet_to_json(sheet, {
            header: header,
            range: "A2:Z100",
        });


        res = res.filter(row => Object.keys(row).length !== 3 &&
                                row["locality"] !== '' &&
                                row["province"] !== '' &&
                                row["cpa"] !== '')

        const resAux = []

        // elimino las keys que sean string vacio
        res.map(row => {
            let keys = Object.keys(row);
            let rowAux = {};
            keys.map(k => {
                if (k !== '') rowAux[k] = row[k]
            })
            resAux.push(rowAux);
        })

        unlinkSync(file.path); // Eliminar Archivo
        return res;
    }

    private getHeader(isThereAFsr: any, fieldnamesPositions: any[]) {
        if (isThereAFsr) {
            return this.headerGetter.getCustomHeader(fieldnamesPositions);
        } else {
            return this.headerGetter.getDefaultHeader();
        }
    }
}
