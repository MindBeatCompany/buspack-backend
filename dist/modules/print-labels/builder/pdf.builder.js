"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfBuilder = void 0;
const PDFDocument = require("pdfkit");
class PdfBuilder extends PDFDocument {
    constructor(options) {
        if (options) {
            super(options);
        }
        else {
            super({
                size: 'A4',
                bufferPages: true,
                layout: 'landscape',
            });
        }
    }
    static create10x10Pdf() {
        return new PdfBuilder({
            size: [10 * 28.35, 10 * 28.35],
            bufferPages: true,
            layout: 'landscape',
            margins: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
        });
    }
    static create10x15Pdf() {
        return new PdfBuilder({
            size: [15 * 28.35, 10 * 28.35],
            bufferPages: true,
            layout: 'landscape',
            margins: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
        });
    }
    static create10x20Pdf() {
        return new PdfBuilder({
            size: [20 * 28.35, 10 * 28.35],
            bufferPages: true,
            layout: 'landscape',
            margins: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
        });
    }
    addBox(x1, x2, y1, y2) {
        this.lineCap('butt')
            .moveTo(x1, y1)
            .lineTo(x1, y2)
            .stroke()
            .lineCap('butt')
            .moveTo(x1, y1)
            .lineTo(x2, y1)
            .stroke()
            .lineCap('butt')
            .moveTo(x2, y1)
            .lineTo(x2, y2)
            .stroke()
            .lineCap('butt')
            .moveTo(x1, y2)
            .lineTo(x2, y2)
            .stroke();
        return this;
    }
}
exports.PdfBuilder = PdfBuilder;
//# sourceMappingURL=pdf.builder.js.map