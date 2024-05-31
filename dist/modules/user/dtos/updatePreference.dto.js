"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePreferenceDto = void 0;
const openapi = require("@nestjs/swagger");
const preferenceUser_dto_1 = require("./preferenceUser.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdatePreferenceDto extends swagger_1.PartialType(preferenceUser_dto_1.PreferenceUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdatePreferenceDto = UpdatePreferenceDto;
//# sourceMappingURL=updatePreference.dto.js.map