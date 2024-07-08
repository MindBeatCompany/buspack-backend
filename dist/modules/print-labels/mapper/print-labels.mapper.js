"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintLabelsMapper = void 0;
const common_1 = require("@nestjs/common");
let PrintLabelsMapper = class PrintLabelsMapper {
    dtoToDomainMapperIn(printLabels) {
        return {
            recipient: printLabels.recipient,
            address: printLabels.address,
            cpa: printLabels.cpa,
            pieceId: printLabels.pieceId,
            idRequest: printLabels.idRequest,
            shipping: printLabels.shipping,
            state: printLabels.status,
            companyName: printLabels.companyName,
            ecoCode: printLabels.ecoCode,
            city: printLabels.city,
            province: printLabels.province,
            ed: printLabels.ed,
            voucher: printLabels.voucher,
            phone: printLabels.phone,
            observations: printLabels.observations,
            origin: printLabels.origin,
        };
    }
};
PrintLabelsMapper = __decorate([
    common_1.Injectable()
], PrintLabelsMapper);
exports.PrintLabelsMapper = PrintLabelsMapper;
//# sourceMappingURL=print-labels.mapper.js.map