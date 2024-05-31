"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintLabelsModule = void 0;
const common_1 = require("@nestjs/common");
const print_labels_mapper_1 = require("./mapper/print-labels.mapper");
const print_labels_controller_1 = require("./print-labels.controller");
const print_labels_service_1 = require("./print-labels.service");
let PrintLabelsModule = class PrintLabelsModule {
};
PrintLabelsModule = __decorate([
    common_1.Module({
        controllers: [print_labels_controller_1.PrintLabelsController],
        providers: [print_labels_service_1.PrintLabelsService, print_labels_mapper_1.PrintLabelsMapper]
    })
], PrintLabelsModule);
exports.PrintLabelsModule = PrintLabelsModule;
//# sourceMappingURL=print-labels.module.js.map