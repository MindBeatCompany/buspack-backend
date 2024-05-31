import * as PDFDocument from 'pdfkit';
export declare class PdfBuilder extends PDFDocument {
    constructor();
    addBox(x1: number, x2: number, y1: number, y2: number): this;
}
