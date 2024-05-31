"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnabledPlacesResponseDTO = void 0;
const openapi = require("@nestjs/swagger");
class EnabledPlacesResponseDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { idog: { required: true, type: () => String }, isActive: { required: true, type: () => String }, code: { required: true, type: () => String }, place_name: { required: true, type: () => String }, type_description: { required: true, type: () => String }, locality_name: { required: true, type: () => String }, province_name: { required: true, type: () => String } };
    }
}
exports.EnabledPlacesResponseDTO = EnabledPlacesResponseDTO;
//# sourceMappingURL=enabled-places-response.dto.js.map