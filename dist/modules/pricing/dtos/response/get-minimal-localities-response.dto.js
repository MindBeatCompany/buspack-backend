"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimalLocalityDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const location_entity_1 = require("../../../enabled-places/entities/location.entity");
class MinimalLocalityDto extends swagger_1.PickType(location_entity_1.LocalityEntity, ['zip_code', 'province_name', 'locality_name']) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.MinimalLocalityDto = MinimalLocalityDto;
//# sourceMappingURL=get-minimal-localities-response.dto.js.map