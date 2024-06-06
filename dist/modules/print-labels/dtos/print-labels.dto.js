"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintLabelsRequestDTO = void 0;
const openapi = require("@nestjs/swagger");
class PrintLabelsRequestDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { companyName: { required: true, type: () => String }, ecoCode: { required: true, type: () => String }, clientName: { required: true, type: () => String }, originAddress: { required: true, type: () => String }, idRequest: { required: true, type: () => Number }, pieceId: { required: true, type: () => Number }, shipping: { required: true, type: () => String }, cpa: { required: true, type: () => String }, recipient: { required: true, type: () => String }, address: { required: true, type: () => String }, observations: { required: true, type: () => String }, status: { required: true, type: () => String }, city: { required: true, type: () => String }, province: { required: true, type: () => String }, tracking: { required: true, type: () => String }, ed: { required: true, type: () => String }, voucher: { required: true, type: () => String }, phone: { required: true, type: () => String } };
    }
}
exports.PrintLabelsRequestDTO = PrintLabelsRequestDTO;
//# sourceMappingURL=print-labels.dto.js.map