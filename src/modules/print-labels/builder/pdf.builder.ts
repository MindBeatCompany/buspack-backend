import * as PDFDocument from 'pdfkit';
export class PdfBuilder extends PDFDocument {

  constructor(options?: PDFKit.PDFDocumentOptions) {
    if (options) {
      super(options);
    } else {
      super({
        size: 'A4',
        bufferPages: true,
        layout: 'landscape',
      });
    }
  }

  static create10x10Pdf(): PdfBuilder {
    return new PdfBuilder({
      size: [10 * 28.35, 10 * 28.35], // Tamaño de página 10x10 cm en puntos (1 cm = 28.35 puntos)
      bufferPages: true,
      layout: 'landscape',
      margins: { // Definición de márgenes explícitos
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    });
  }

  static create10x15Pdf(): PdfBuilder {
    return new PdfBuilder({
      size: [15 * 28.35,10 * 28.35], // Tamaño de página 10x15 cm en puntos
      bufferPages: true,
      layout: 'landscape',
      margins: { // Definición de márgenes explícitos
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    });
  }
  
  static create10x20Pdf(): PdfBuilder {
    return new PdfBuilder({
      size: [20 * 28.35, 10 * 28.35 ], // Tamaño de página 10x20 cm en puntos
      bufferPages: true,
      layout: 'landscape', // Puedes cambiar a 'portrait' si prefieres el modo retrato
      margins: { // Definición de márgenes explícitos
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
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
