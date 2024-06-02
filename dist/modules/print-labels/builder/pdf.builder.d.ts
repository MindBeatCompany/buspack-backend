import * as PDFDocument from 'pdfkit';
export declare class PdfBuilder extends PDFDocument {
    constructor(options?: PDFKit.PDFDocumentOptions);
    static create10x10Pdf(): PdfBuilder;
    static create10x15Pdf(): PdfBuilder;
    static create10x20Pdf(): PdfBuilder;
    addBox(x1: number, x2: number, y1: number, y2: number): this;
}
