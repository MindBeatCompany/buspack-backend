/// <reference types="node" />
import { PrintLabels } from "./domain/print-labels";
export declare class PrintLabelsService {
    constructor();
    generatePDFA4(data: PrintLabels[]): Promise<Buffer>;
    private generatebarcode;
    private overflowText;
    generatePDF10x10(data: PrintLabels[]): Promise<Buffer>;
    private generatebarcode10x10;
    generatePDF10x15(data: PrintLabels[]): Promise<Buffer>;
    private generatebarcode10x15;
    generatePDF10x20(data: PrintLabels[]): Promise<Buffer>;
    private generatebarcode10x20;
}
