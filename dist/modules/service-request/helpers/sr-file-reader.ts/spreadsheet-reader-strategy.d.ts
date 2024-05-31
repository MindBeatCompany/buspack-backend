import SRFileReaderAbstractStrategy from "./sr-file-reader-abstract-strategy";
export default class SpreadsheetReaderStrategy extends SRFileReaderAbstractStrategy {
    readFileAux(file: any, { ...options }: {
        [x: string]: any;
    }, fieldnamesPositions: any[]): unknown[];
    private getHeader;
}
