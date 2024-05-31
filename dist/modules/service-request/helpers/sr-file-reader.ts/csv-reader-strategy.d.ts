import SRFileReaderAbstractStrategy from "./sr-file-reader-abstract-strategy";
export default class CsvReaderStrategy extends SRFileReaderAbstractStrategy {
    readFileAux(file: any, { ...options }: {
        [x: string]: any;
    }, fieldnamePositions: any): Promise<unknown>;
    private getDelimiter;
    private getFileEncoding;
}
