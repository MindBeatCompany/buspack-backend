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
    async generatePDFA4(data) {
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
                    .text(data[i * 2].ed, marginlefttext1 + 215, initLine - 40 + lineHeight * 0.9)
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
                    .text("N° de guia:", marginlefttext1 + 150, initLine + lineHeight * 8)
                    .text(data[i * 2].pieceId + "", marginlefttext1 + 210, initLine + lineHeight * 8)
                    .image(barCode1, marginlefttext1 + 80, initLine + lineHeight * 9, {
                    width: 120,
                })
                    .fontSize(18)
                    .text(data[i * 2].city, marginlefttext1 + 16, initLine + lineHeight * 12.5)
                    .text(data[i * 2].province, marginlefttext1 + 16, initLine + lineHeight * 14.5)
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
                    .text(data[i * 2].phone, marginlefttext1 + 52, secondLine + lineHeight * 8)
                    .moveTo(marginlefttext1 + 50, secondLine + lineHeight * 10 - offset)
                    .lineTo(340, secondLine + lineHeight * 10 - offset)
                    .stroke()
                    .text("Observaciones:", marginlefttext1, secondLine + lineHeight * 10)
                    .moveTo(marginlefttext1 + 90, secondLine + lineHeight * 11 - offset)
                    .lineTo(340, secondLine + lineHeight * 11 - offset)
                    .stroke()
                    .text(data[i * 2].observations, marginlefttext1 + 92, secondLine + lineHeight * 10)
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
                        .text(data[i * 2 + 1].ed, marginlefttext2 + 215, initLine - 40 + lineHeight)
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
                        .text("N° de guia:", marginlefttext2 + 150, initLine + lineHeight * 8)
                        .text(data[i * 2 + 1].pieceId + "", marginlefttext2 + 210, initLine + lineHeight * 8)
                        .image(barCode2, marginlefttext2 + 66, initLine + lineHeight * 9, {
                        width: 120,
                    })
                        .fontSize(18)
                        .text(data[i * 2].city, marginlefttext2 + 16, initLine + lineHeight * 12.5)
                        .text(data[i * 2].province, marginlefttext2 + 16, initLine + lineHeight * 14.5)
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
                        .text(data[i * 2].phone, marginlefttext2 + 52, secondLine + lineHeight * 8)
                        .moveTo(marginlefttext2 + 48, secondLine + lineHeight * 10 - offset)
                        .lineTo(680, secondLine + lineHeight * 10 - offset)
                        .stroke()
                        .text("Observaciones:", marginlefttext2, secondLine + lineHeight * 10)
                        .moveTo(marginlefttext2 + 78, secondLine + lineHeight * 11 - offset)
                        .lineTo(680, secondLine + lineHeight * 11 - offset)
                        .stroke()
                        .text(data[i * 2].observations, marginlefttext2 + 80, secondLine + lineHeight * 10)
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
    async generatePDF10x10(data) {
        console.log("Generating PDF...");
        const pages = data.length;
        const pdfBuffer = await new Promise(async (resolve, reject) => {
            const doc = pdf_builder_1.PdfBuilder.create10x10Pdf();
            const marginlefttext1 = 0.4 * 28.35;
            const marginlefttext2 = 7.25 * 28.35;
            const initLine = 1.2 * 28.35;
            const secondLine = 5.5 * 28.35;
            const lineHeight = 0.4 * 28.35;
            const offset = 0.5 * 28.35;
            for (let i = 0; i < pages; i++) {
                const barCode1 = await this.generatebarcode10x10(data[i].pieceId + "");
                doc
                    .image("src/shared/template-files/Logotipo-color.png", marginlefttext1, offset - 0.2, { width: 80 })
                    .font("Helvetica-Bold")
                    .fontSize(20)
                    .text(data[i].ed, marginlefttext1 + 225, initLine - 28 + lineHeight)
                    .fontSize(10)
                    .text("C. Cliente:", marginlefttext1, initLine + lineHeight)
                    .font("Helvetica")
                    .text(data[i].ecoCode, marginlefttext1 + 50, initLine + lineHeight)
                    .font("Helvetica-Bold")
                    .text("Cliente:", marginlefttext1, initLine + lineHeight * 2.5)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].companyName, 48), marginlefttext1 + 47, initLine + lineHeight * 2.5, { width: 150, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("N° del pedido:", marginlefttext1, initLine + lineHeight * 4.2)
                    .font("Helvetica")
                    .text(data[i].idRequest + "", marginlefttext1 + 68, initLine + lineHeight * 4.2)
                    .text("|", marginlefttext1 + 135, initLine + lineHeight * 4.2)
                    .font("Helvetica-Bold")
                    .text("N° de Guia:", marginlefttext1 + 150, initLine + lineHeight * 4.2)
                    .font("Helvetica")
                    .text(data[i].voucher + "", marginlefttext1 + 210, initLine + lineHeight * 4.2)
                    .image(barCode1, marginlefttext1 + 20, initLine + lineHeight * 5.8, { width: 220 })
                    .font("Helvetica-Bold")
                    .fontSize(14)
                    .text(data[i].city, marginlefttext1 + 70, initLine + lineHeight * 11)
                    .text(data[i].province, marginlefttext1 + 70, initLine + lineHeight * 12.5)
                    .fontSize(10)
                    .font("Helvetica-Bold")
                    .text("Destinatario:", marginlefttext1, secondLine + lineHeight * 3.6)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].recipient, 48), marginlefttext1 + 63, secondLine + lineHeight * 3.6, { width: 300, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("Dirección:", marginlefttext1, secondLine + lineHeight * 4.9)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].address, 40), marginlefttext1 + 50, secondLine + lineHeight * 4.9, { width: 300, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("CP:", marginlefttext1, secondLine + lineHeight * 6.2)
                    .font("Helvetica")
                    .text(data[i].cpa, marginlefttext1 + 19, secondLine + lineHeight * 6.2)
                    .font("Helvetica-Bold")
                    .text("Teléfono:", marginlefttext1, secondLine + lineHeight * 7.5)
                    .text(data[i].phone, marginlefttext1 + 47, secondLine + lineHeight * 7.5)
                    .font("Helvetica")
                    .font("Helvetica-Bold")
                    .text("Observacion:", marginlefttext1, secondLine + lineHeight * 8.8)
                    .text(data[i].observations, marginlefttext1 + 65, secondLine + lineHeight * 8.8)
                    .font("Helvetica")
                    .font("Helvetica-Bold")
                    .fontSize(14)
                    .text("Pieza: " + (i + 1).toString() + " / " + pages.toString(), marginlefttext1 + 188, secondLine + lineHeight * 6.0);
                if (i !== pages - 1) {
                    doc.addPage();
                }
            }
            const chunks = [];
            doc.on("data", (chunk) => chunks.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.end();
        });
        return pdfBuffer;
    }
    generatebarcode10x10(data) {
        return bwipjs.toBuffer({
            bcid: "code128",
            text: data,
            scale: 3,
            height: 6,
            includetext: true,
            textxalign: "center",
            textsize: 8
        });
    }
    async generatePDF10x15(data) {
        console.log("Generating PDF...");
        const pages = data.length;
        const pdfBuffer = await new Promise(async (resolve, reject) => {
            const doc = pdf_builder_1.PdfBuilder.create10x15Pdf();
            const marginlefttext1 = 0.4 * 28.35;
            const marginlefttext2 = 7.25 * 28.35;
            const initLine = 1.8 * 28.35;
            const secondLine = 5.0 * 28.35;
            const thirdLine = 6.5 * 28.35;
            const forthLine = 10.5 * 28.35;
            const lineHeight = 0.4 * 28.35;
            const offset = 0.5 * 28.35;
            for (let i = 0; i < pages; i++) {
                const barCode1 = await this.generatebarcode10x15(data[i].pieceId + "");
                doc
                    .image("src/shared/template-files/Logotipo-color.png", marginlefttext1, offset - 0.2, { width: 80 })
                    .font("Helvetica-Bold")
                    .fontSize(20)
                    .text(data[i].ed, marginlefttext1 + 225, initLine - 28 + lineHeight)
                    .fontSize(10.5)
                    .text("Remitente: ", marginlefttext1, initLine + lineHeight)
                    .text("C. Cliente: ", marginlefttext1, initLine + lineHeight * 2.5)
                    .font("Helvetica")
                    .text(data[i].ecoCode, marginlefttext1 + 52, initLine + lineHeight * 2.5)
                    .font("Helvetica-Bold")
                    .text("Cliente:", marginlefttext1, initLine + lineHeight * 4)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].companyName, 45), marginlefttext1 + 40, initLine + lineHeight * 4, { width: 250, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("Direccion:", marginlefttext1, initLine + lineHeight * 5.5)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].address, 48), marginlefttext1 + 56, initLine + lineHeight * 5.5, { width: 250, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("Envío", marginlefttext1, secondLine + lineHeight)
                    .text("N° del pedido:", marginlefttext1, secondLine + lineHeight * 2.5)
                    .font("Helvetica")
                    .text(data[i].idRequest + "", marginlefttext1 + 72, secondLine + lineHeight * 2.5)
                    .text("|", marginlefttext1 + 135, secondLine + lineHeight * 2.5)
                    .font("Helvetica-Bold")
                    .text("N° de Guia:", marginlefttext1 + 142, secondLine + lineHeight * 2.5)
                    .font("Helvetica")
                    .text(data[i].voucher + "", marginlefttext1 + 206, secondLine + lineHeight * 2.5)
                    .image(barCode1, marginlefttext1 + 10, thirdLine + lineHeight, { width: 250 })
                    .font("Helvetica-Bold")
                    .fontSize(14)
                    .text(data[i].city, marginlefttext1 + 70, thirdLine + lineHeight * 6.2)
                    .text(data[i].province, marginlefttext1 + 70, thirdLine + lineHeight * 7.5)
                    .fontSize(10.5)
                    .font("Helvetica-Bold")
                    .text("Destinatario:", marginlefttext1, forthLine + lineHeight)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].recipient, 48), marginlefttext1 + 65, forthLine + lineHeight, { width: 250, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("Dirección:", marginlefttext1, forthLine + lineHeight * 2.5)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].address, 40), marginlefttext1 + 52, forthLine + lineHeight * 2.5, { width: 250, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("CP:", marginlefttext1, forthLine + lineHeight * 4)
                    .font("Helvetica")
                    .text(data[i].cpa, marginlefttext1 + 19, forthLine + lineHeight * 4)
                    .font("Helvetica-Bold")
                    .text("Teléfono:", marginlefttext1, forthLine + lineHeight * 5.5)
                    .text(data[i].phone, marginlefttext1 + 47, forthLine + lineHeight * 5.5)
                    .font("Helvetica")
                    .font("Helvetica-Bold")
                    .text("Observacion:", marginlefttext1, forthLine + lineHeight * 7)
                    .text(data[i].observations, marginlefttext1 + 68, forthLine + lineHeight * 7)
                    .font("Helvetica")
                    .font("Helvetica-Bold")
                    .fontSize(14)
                    .text("Pieza: " + (i + 1).toString() + " / " + pages.toString(), marginlefttext1 + 188, forthLine + lineHeight * 8.5);
                if (i !== pages - 1) {
                    doc.addPage();
                }
            }
            const chunks = [];
            doc.on("data", (chunk) => chunks.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.end();
        });
        return pdfBuffer;
    }
    generatebarcode10x15(data) {
        return bwipjs.toBuffer({
            bcid: "code128",
            text: data,
            scale: 3,
            height: 6,
            includetext: true,
            textxalign: "center",
            textsize: 6
        });
    }
    async generatePDF10x20(data) {
        console.log("Generating PDF...");
        const pages = data.length;
        const pdfBuffer = await new Promise(async (resolve, reject) => {
            const doc = pdf_builder_1.PdfBuilder.create10x20Pdf();
            const marginlefttext1 = 0.4 * 28.35;
            const marginlefttext2 = 7.25 * 28.35;
            const initLine = 1 * 28.35;
            const secondLine = 5.0 * 28.35;
            const thirdLine = 9.5 * 28.35;
            const forthLine = 12.0 * 28.35;
            const fifthLine = 16.0 * 28.35;
            const lineHeight = 0.4 * 28.35;
            const offset = 0.5 * 28.35;
            for (let i = 0; i < pages; i++) {
                const barCode1 = await this.generatebarcode10x20(data[i].pieceId + "");
                doc
                    .image("src/shared/template-files/Logotipo-color.png", marginlefttext1, initLine - 0.2, { width: 80 })
                    .font("Helvetica-Bold")
                    .fontSize(20)
                    .text(data[i].ed, marginlefttext1 + 125, initLine - 10 + lineHeight)
                    .fontSize(14)
                    .text("Pieza: " + (i + 1).toString() + " / " + pages.toString(), marginlefttext1 + 188, initLine - 8 + lineHeight)
                    .fontSize(10.5)
                    .text("N° del pedido:", marginlefttext1, initLine + lineHeight * 4.5)
                    .font("Helvetica")
                    .text(data[i].idRequest + "", marginlefttext1 + 72, initLine + lineHeight * 4.5)
                    .text("|", marginlefttext1 + 135, initLine + lineHeight * 4.5)
                    .font("Helvetica-Bold")
                    .text("N° de Guia:", marginlefttext1 + 142, initLine + lineHeight * 4.5)
                    .font("Helvetica")
                    .text(data[i].voucher + "", marginlefttext1 + 206, initLine + lineHeight * 4.5)
                    .fontSize(8)
                    .text("Recorta esta parte de la etiqueta para que tu paquete viaje seguro.", marginlefttext1 + 14, initLine + lineHeight * 7.0)
                    .moveTo(marginlefttext1 + 4, initLine + lineHeight * 7.8)
                    .lineTo(270, initLine + lineHeight * 7.8)
                    .stroke()
                    .image("src/shared/template-files/Logotipo-color.png", marginlefttext1, secondLine, { width: 80 })
                    .font("Helvetica-Bold")
                    .fontSize(20)
                    .text(data[i].ed, marginlefttext1 + 225, secondLine + 5)
                    .fontSize(10.5)
                    .text("Remitente: ", marginlefttext1, secondLine + lineHeight * 4)
                    .text("C. Cliente: ", marginlefttext1, secondLine + lineHeight * 5.5)
                    .font("Helvetica")
                    .text(data[i].ecoCode, marginlefttext1 + 52, secondLine + lineHeight * 5.5)
                    .font("Helvetica-Bold")
                    .text("Cliente:", marginlefttext1, secondLine + lineHeight * 7)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].companyName, 45), marginlefttext1 + 42, secondLine + lineHeight * 7, { width: 250, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("Direccion:", marginlefttext1, secondLine + lineHeight * 8.5)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].address, 48), marginlefttext1 + 54, secondLine + lineHeight * 8.5, { width: 250, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("Envío", marginlefttext1, thirdLine + lineHeight)
                    .text("N° del pedido:", marginlefttext1, thirdLine + lineHeight * 2.5)
                    .font("Helvetica")
                    .text(data[i].idRequest + "", marginlefttext1 + 72, thirdLine + lineHeight * 2.5)
                    .text("|", marginlefttext1 + 135, thirdLine + lineHeight * 2.5)
                    .font("Helvetica-Bold")
                    .text("N° de Guia:", marginlefttext1 + 142, thirdLine + lineHeight * 2.5)
                    .font("Helvetica")
                    .text(data[i].voucher + "", marginlefttext1 + 206, thirdLine + lineHeight * 2.5)
                    .image(barCode1, marginlefttext1 + 10, forthLine + lineHeight, { width: 250 })
                    .font("Helvetica-Bold")
                    .fontSize(14)
                    .text(data[i].city, marginlefttext1 + 70, forthLine + lineHeight * 6.5)
                    .text(data[i].province, marginlefttext1 + 70, forthLine + lineHeight * 8)
                    .fontSize(10.5)
                    .font("Helvetica-Bold")
                    .text("Destinatario:", marginlefttext1, fifthLine + lineHeight)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].recipient, 48), marginlefttext1 + 65, fifthLine + lineHeight, { width: 250, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("Dirección:", marginlefttext1, fifthLine + lineHeight * 2.5)
                    .font("Helvetica")
                    .text(this.overflowText(data[i].address, 40), marginlefttext1 + 52, fifthLine + lineHeight * 2.5, { width: 250, lineGap: 4 })
                    .font("Helvetica-Bold")
                    .text("CP:", marginlefttext1, fifthLine + lineHeight * 4)
                    .font("Helvetica")
                    .text(data[i].cpa, marginlefttext1 + 19, fifthLine + lineHeight * 4)
                    .font("Helvetica-Bold")
                    .text("Teléfono:", marginlefttext1, fifthLine + lineHeight * 5.5)
                    .text(data[i].phone, marginlefttext1 + 47, fifthLine + lineHeight * 5.5)
                    .font("Helvetica")
                    .font("Helvetica-Bold")
                    .fontSize(14)
                    .text("Pieza: " + (i + 1).toString() + " / " + pages.toString(), marginlefttext1 + 188, fifthLine + lineHeight * 4.5)
                    .fontSize(10.5)
                    .text("Observacion:", marginlefttext1, fifthLine + lineHeight * 7)
                    .text(data[i].observations, marginlefttext1 + 69, fifthLine + lineHeight * 7)
                    .font("Helvetica")
                    .font("Helvetica-Bold");
                if (i !== pages - 1) {
                    doc.addPage();
                }
            }
            const chunks = [];
            doc.on("data", (chunk) => chunks.push(chunk));
            doc.on("end", () => resolve(Buffer.concat(chunks)));
            doc.end();
        });
        return pdfBuffer;
    }
    generatebarcode10x20(data) {
        return bwipjs.toBuffer({
            bcid: "code128",
            text: data,
            scale: 3,
            height: 6,
            includetext: true,
            textxalign: "center",
            textsize: 6
        });
    }
};
PrintLabelsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], PrintLabelsService);
exports.PrintLabelsService = PrintLabelsService;
//# sourceMappingURL=print-labels.service.js.map