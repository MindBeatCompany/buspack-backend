import HeaderGetter from "../header-getter";
export default abstract class SRFileReaderAbstractStrategy {
    headerGetter: HeaderGetter;
    constructor();
    readFile(file: any, { ...options }: {
        [x: string]: any;
    }, fieldnamesPositions?: any[]): Promise<any>;
    protected abstract readFileAux(file: any, options: {
        [x: string]: any;
    }, fieldnamesPositions: any[]): any;
    private fillUndefinedFieldsWithNull;
}
