import * as PDFDocument from 'pdfkit';
export class PdfBuilder extends PDFDocument {
  constructor() {
    super({
      size: 'A4',
      bufferPages: true,
      layout: 'landscape',
    });
  }

  addBox(x1: number, x2: number, y1: number, y2: number) {
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
