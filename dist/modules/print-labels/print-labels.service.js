"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintLabelsService = void 0;
const common_1 = require("@nestjs/common");
const pdf_builder_1 = require("./builder/pdf.builder");
const bwipjs = require("bwip-js");
let PrintLabelsService = class PrintLabelsService {
    constructor() { }
    async generatePDF(data) {
        const pages = Math.ceil(data.length / 2);
        const pdfBuffer = await new Promise(async (resolve, reject) => {
            const doc = new pdf_builder_1.PdfBuilder();
            const marginlefttext1 = 58;
            const marginlefttext2 = 408;
            const initLine = 115;
            const secondLine = 340;
            const lineHeight = 14;
            const offset = 3;
            for (let i = 0; i < pages; i++) {
                const barCode1 = await this.generatebarcode(data[i * 2].pieceId + "");
                const barCode2 = data[i * 2 + 1] &&
                    (await this.generatebarcode(data[i * 2 + 1].pieceId + ""));
                doc
                    .image("src/shared/template-files/Logotipo-color.png", 52, 52, {
                    width: 120,
                })
                    .font("Helvetica-Bold")
                    .fontSize(40)
                    .text(data[i * 2].ed, marginlefttext1 + 20, initLine - 40 + lineHeight)
                    .fontSize(10)
                    .text("COD. CLIENTE / N° de ECO:", marginlefttext1, initLine + lineHeight)
                    .text(data[i * 2].ecoCode, marginlefttext1 + 146, initLine + lineHeight)
                    .moveTo(marginlefttext1 + 140, initLine + lineHeight * 2 - offset)
                    .lineTo(340, initLine + lineHeight * 2 - offset)
                    .stroke()
                    .text("Cliente:", marginlefttext1, initLine + lineHeight * 2)
                    .text(this.overflowText(data[i * 2].companyName, 48), marginlefttext1 + 47, initLine + lineHeight * 2, { width: 150, lineGap: 4 })
                    .moveTo(marginlefttext1 + 45, initLine + lineHeight * 3 - offset)
                    .lineTo(340, initLine + lineHeight * 3 - offset)
                    .stroke()
                    .moveTo(marginlefttext1 + 45, initLine + lineHeight * 4 - offset)
                    .lineTo(340, initLine + lineHeight * 4 - offset)
                    .stroke()
                    .text("Dirección del origen:", marginlefttext1, initLine + lineHeight * 5)
                    .moveTo(marginlefttext1 + 100, initLine + lineHeight * 6 - offset)
                    .lineTo(340, initLine + lineHeight * 6 - offset)
                    .stroke()
                    .moveTo(marginlefttext1 + 100, initLine + lineHeight * 7 - offset)
                    .lineTo(340, initLine + lineHeight * 7 - offset)
                    .stroke()
                    .text("N° del pedido:", marginlefttext1, initLine + lineHeight * 8)
                    .text(data[i * 2].idRequest + "", marginlefttext1 + 68, initLine + lineHeight * 8)
                    .text("N° de Pieza:", marginlefttext1 + 150, initLine + lineHeight * 8)
                    .text(data[i * 2].pieceId + "", marginlefttext1 + 210, initLine + lineHeight * 8)
                    .image(barCode1, marginlefttext1 + 66, initLine + lineHeight * 9, {
                    width: 120,
                })
                    .fontSize(25)
                    .text(data[i * 2].city, marginlefttext1 + 25, initLine + lineHeight * 12.5)
                    .text(data[i * 2].province, marginlefttext1 + 25, initLine + lineHeight * 14.5)
                    .fontSize(10)
                    .text("Destino:", marginlefttext1, secondLine + lineHeight)
                    .text(this.overflowText(data[i * 2].shipping, 48), marginlefttext1 + 52, secondLine + lineHeight, {
                    width: 150,
                    lineGap: 4,
                })
                    .moveTo(marginlefttext1 + 50, secondLine + lineHeight * 2 - offset)
                    .lineTo(340, secondLine + lineHeight * 2 - offset)
                    .stroke()
                    .moveTo(marginlefttext1 + 50, secondLine + lineHeight * 3 - offset)
                    .lineTo(340, secondLine + lineHeight * 3 - offset)
                    .stroke()
                    .text("C.P. Destino:", marginlefttext1, secondLine + lineHeight * 3)
                    .text(data[i * 2].cpa, marginlefttext1 + 63, secondLine + lineHeight * 3)
                    .moveTo(marginlefttext1 + 61, secondLine + lineHeight * 4 - offset)
                    .lineTo(340, secondLine + lineHeight * 4 - offset)
                    .stroke()
                    .text("Destinatario:", marginlefttext1, secondLine + lineHeight * 4)
                    .text(this.overflowText(data[i * 2].recipient, 48), marginlefttext1 + 63, secondLine + lineHeight * 4, { width: 150, lineGap: 4 })
                    .moveTo(marginlefttext1 + 61, secondLine + lineHeight * 5 - offset)
                    .lineTo(340, secondLine + lineHeight * 5 - offset)
                    .stroke()
                    .moveTo(marginlefttext1 + 61, secondLine + lineHeight * 6 - offset)
                    .lineTo(340, secondLine + lineHeight * 6 - offset)
                    .stroke()
                    .text("Dirección Entrega Domicilio: ", marginlefttext1, secondLine + lineHeight * 6)
                    .text(this.overflowText(data[i * 2].address, 40), marginlefttext1 + 140, secondLine + lineHeight * 6, { width: 120, lineGap: 4 })
                    .moveTo(marginlefttext1 + 140, secondLine + lineHeight * 7 - offset)
                    .lineTo(340, secondLine + lineHeight * 7 - offset)
                    .stroke()
                    .moveTo(marginlefttext1 + 140, secondLine + lineHeight * 8 - offset)
                    .lineTo(340, secondLine + lineHeight * 8 - offset)
                    .stroke()
                    .text("Teléfono:", marginlefttext1, secondLine + lineHeight * 8)
                    .moveTo(marginlefttext1 + 50, secondLine + lineHeight * 9 - offset)
                    .lineTo(340, secondLine + lineHeight * 9 - offset)
                    .stroke()
                    .moveTo(marginlefttext1 + 50, secondLine + lineHeight * 10 - offset)
                    .lineTo(340, secondLine + lineHeight * 10 - offset)
                    .stroke()
                    .text("Observaciones:", marginlefttext1, secondLine + lineHeight * 10)
                    .moveTo(marginlefttext1 + 90, secondLine + lineHeight * 11 - offset)
                    .lineTo(340, secondLine + lineHeight * 11 - offset)
                    .stroke()
                    .moveTo(marginlefttext1, secondLine + lineHeight * 12 - offset)
                    .lineTo(340, secondLine + lineHeight * 12 - offset)
                    .stroke();
                if (data[i * 2 + 1]) {
                    doc
                        .image("src/shared/template-files/Logotipo-color.png", 402, 52, {
                        width: 120,
                    })
                        .font("Helvetica-Bold")
                        .fontSize(40)
                        .text(data[i * 2 + 1].ed, marginlefttext2 + 20, initLine - 40 + lineHeight)
                        .fontSize(10)
                        .text("COD. CLIENTE / N° de ECO:", marginlefttext2, initLine + lineHeight)
                        .text(data[i * 2 + 1].ecoCode, marginlefttext2 + 146, initLine + lineHeight)
                        .moveTo(marginlefttext2 + 135, initLine + lineHeight * 2 - offset)
                        .lineTo(680, initLine + lineHeight * 2 - offset)
                        .stroke()
                        .text("Cliente:", marginlefttext2, initLine + lineHeight * 2)
                        .text(this.overflowText(data[i * 2 + 1].companyName, 48), marginlefttext2 + 47, initLine + lineHeight * 2, { width: 150, lineGap: 4 })
                        .moveTo(marginlefttext2 + 45, initLine + lineHeight * 3 - offset)
                        .lineTo(680, initLine + lineHeight * 3 - offset)
                        .stroke()
                        .moveTo(marginlefttext2 + 45, initLine + lineHeight * 4 - offset)
                        .lineTo(680, initLine + lineHeight * 4 - offset)
                        .stroke()
                        .text("Dirección del origen:", marginlefttext2, initLine + lineHeight * 5)
                        .moveTo(marginlefttext2 + 100, initLine + lineHeight * 6 - offset)
                        .lineTo(680, initLine + lineHeight * 6 - offset)
                        .stroke()
                        .moveTo(marginlefttext2 + 100, initLine + lineHeight * 7 - offset)
                        .lineTo(680, initLine + lineHeight * 7 - offset)
                        .stroke()
                        .text("N° del pedido:", marginlefttext2, initLine + lineHeight * 8)
                        .text(data[i * 2 + 1].idRequest + "", marginlefttext2 + 68, initLine + lineHeight * 8)
                        .text("N° de Pieza:", marginlefttext2 + 150, initLine + lineHeight * 8)
                        .text(data[i * 2 + 1].pieceId + "", marginlefttext2 + 210, initLine + lineHeight * 8)
                        .image(barCode2, marginlefttext2 + 66, initLine + lineHeight * 9, {
                        width: 120,
                    })
                        .fontSize(25)
                        .text(data[i * 2].city, marginlefttext2 + 25, initLine + lineHeight * 12.5)
                        .text(data[i * 2].province, marginlefttext2 + 25, initLine + lineHeight * 14.5)
                        .fontSize(10)
                        .text("Destino:", marginlefttext2, secondLine + lineHeight)
                        .text(data[i * 2 + 1].shipping, marginlefttext2 + 52, secondLine + lineHeight)
                        .moveTo(marginlefttext2 + 50, secondLine + lineHeight * 2 - offset)
                        .lineTo(680, secondLine + lineHeight * 2 - offset)
                        .stroke()
                        .moveTo(marginlefttext2 + 50, secondLine + lineHeight * 3 - offset)
                        .lineTo(680, secondLine + lineHeight * 3 - offset)
                        .stroke()
                        .text("C.P. Destino:", marginlefttext2, secondLine + lineHeight * 3)
                        .text(data[i * 2 + 1].cpa, marginlefttext2 + 63, secondLine + lineHeight * 3)
                        .moveTo(marginlefttext2 + 61, secondLine + lineHeight * 4 - offset)
                        .lineTo(680, secondLine + lineHeight * 4 - offset)
                        .stroke()
                        .text("Destinatario:", marginlefttext2, secondLine + lineHeight * 4)
                        .text(this.overflowText(data[i * 2 + 1].recipient, 48), marginlefttext2 + 63, secondLine + lineHeight * 4, { width: 150, lineGap: 4 })
                        .moveTo(marginlefttext2 + 61, secondLine + lineHeight * 5 - offset)
                        .lineTo(680, secondLine + lineHeight * 5 - offset)
                        .stroke()
                        .moveTo(marginlefttext2 + 61, secondLine + lineHeight * 6 - offset)
                        .lineTo(680, secondLine + lineHeight * 6 - offset)
                        .stroke()
                        .text("Dirección Entrega Domicilio: ", marginlefttext2, secondLine + lineHeight * 6)
                        .text(this.overflowText(data[i * 2 + 1].address, 40), marginlefttext2 + 140, secondLine + lineHeight * 6, { width: 120, lineGap: 4 })
                        .moveTo(marginlefttext2 + 140, secondLine + lineHeight * 7 - offset)
                        .lineTo(680, secondLine + lineHeight * 7 - offset)
                        .stroke()
                        .moveTo(marginlefttext2 + 140, secondLine + lineHeight * 8 - offset)
                        .lineTo(680, secondLine + lineHeight * 8 - offset)
                        .stroke()
                        .text("Teléfono:", marginlefttext2, secondLine + lineHeight * 8)
                        .moveTo(marginlefttext2 + 48, secondLine + lineHeight * 9 - offset)
                        .lineTo(680, secondLine + lineHeight * 9 - offset)
                        .stroke()
                        .moveTo(marginlefttext2 + 48, secondLine + lineHeight * 10 - offset)
                        .lineTo(680, secondLine + lineHeight * 10 - offset)
                        .stroke()
                        .text("Observaciones:", marginlefttext2, secondLine + lineHeight * 10)
                        .moveTo(marginlefttext2 + 78, secondLine + lineHeight * 11 - offset)
                        .lineTo(680, secondLine + lineHeight * 11 - offset)
                        .stroke()
                        .moveTo(marginlefttext2, secondLine + lineHeight * 12 - offset)
                        .lineTo(680, secondLine + lineHeight * 12 - offset)
                        .stroke()
                        .moveDown();
                    doc.addBox(400, 700, 50, 520);
                }
                doc.addBox(50, 350, 50, 520);
                if (i + 1 !== pages) {
                    doc.addPage({ size: "A4", bufferPages: true, layout: "landscape" });
                }
            }
            doc.end();
            const buffer = [];
            doc.on("data", buffer.push.bind(buffer));
            doc.on("end", () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
        });
        return pdfBuffer;
    }
    generatebarcode(data) {
        return bwipjs.toBuffer({
            bcid: "code128",
            text: data,
            scale: 3,
            height: 10,
            includetext: true,
            textxalign: "center",
        });
    }
    overflowText(text, limitNumber) {
        if (text === undefined) {
            return "";
        }
        else {
            return text.length > limitNumber
                ? `${text.substr(0, limitNumber)}...`
                : text;
        }
    }
};
PrintLabelsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PrintLabelsService);
exports.PrintLabelsService = PrintLabelsService;
//# sourceMappingURL=print-labels.service.js.map