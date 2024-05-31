/// <reference types="node" />
import { PrintLabels } from "./domain/print-labels";
export declare class PrintLabelsService {
    constructor();
    generatePDF(data: PrintLabels[]): Promise<Buffer>;
    private generatebarcode;
    private overflowText;
}
