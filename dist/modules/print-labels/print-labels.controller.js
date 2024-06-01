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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintLabelsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const print_labels_mapper_1 = require("./mapper/print-labels.mapper");
const print_labels_service_1 = require("./print-labels.service");
let PrintLabelsController = class PrintLabelsController {
    constructor(printLabelsService, printLabelsMapper) {
        this.printLabelsService = printLabelsService;
        this.printLabelsMapper = printLabelsMapper;
    }
    async getPDFA4(data, res) {
        const buffer = await this.printLabelsService.generatePDFA4(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));
        res.set({
            'Content-Type': 'application/pdfA4',
            'Content-Disposition': 'attachment; filename=example.pdf',
            'Content-Length': buffer.length,
        });
        res.send(buffer);
    }
    async getPDF10x10(data, res) {
        const buffer = await this.printLabelsService.generatePDF10x10(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));
        res.set({
            'Content-Type': 'application/pdf10x10',
            'Content-Disposition': 'attachment; filename=example.pdf',
            'Content-Length': buffer.length,
        });
        res.send(buffer);
    }
    async getPDF10x15(data, res) {
        const buffer = await this.printLabelsService.generatePDF10x15(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));
        res.set({
            'Content-Type': 'application/pdf10x15',
            'Content-Disposition': 'attachment; filename=example.pdf',
            'Content-Length': buffer.length,
        });
        res.send(buffer);
    }
    async getPDF10x20(data, res) {
        const buffer = await this.printLabelsService.generatePDF10x20(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));
        res.set({
            'Content-Type': 'application/pdf10x20',
            'Content-Disposition': 'attachment; filename=example.pdf',
            'Content-Length': buffer.length,
        });
        res.send(buffer);
    }
};
__decorate([
    common_1.Post('/pdfA4'),
    common_1.Header("Content-type", "application/vnd.ms-excel"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], PrintLabelsController.prototype, "getPDFA4", null);
__decorate([
    common_1.Post('/pdf10x10'),
    common_1.Header("Content-type", "application/vnd.ms-excel"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], PrintLabelsController.prototype, "getPDF10x10", null);
__decorate([
    common_1.Post('/pdf10x15'),
    common_1.Header("Content-type", "application/vnd.ms-excel"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], PrintLabelsController.prototype, "getPDF10x15", null);
__decorate([
    common_1.Post('/pdf10x20'),
    common_1.Header("Content-type", "application/vnd.ms-excel"),
    openapi.ApiResponse({ status: 201 }),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], PrintLabelsController.prototype, "getPDF10x20", null);
PrintLabelsController = __decorate([
    common_1.Controller('print-labels'),
    __metadata("design:paramtypes", [print_labels_service_1.PrintLabelsService, print_labels_mapper_1.PrintLabelsMapper])
], PrintLabelsController);
exports.PrintLabelsController = PrintLabelsController;
//# sourceMappingURL=print-labels.controller.js.map