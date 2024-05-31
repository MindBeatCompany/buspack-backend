"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfBuilder = void 0;
const PDFDocument = require("pdfkit");
class PdfBuilder extends PDFDocument {
    constructor() {
        super({
            size: 'A4',
            bufferPages: true,
            layout: 'landscape',
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