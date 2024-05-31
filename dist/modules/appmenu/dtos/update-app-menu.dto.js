"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppMenuDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const createAppMenu_dto_1 = require("./createAppMenu.dto");
class UpdateAppMenuDto extends swagger_1.PartialType(createAppMenu_dto_1.CreateAppMenuDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateAppMenuDto = UpdateAppMenuDto;
//# sourceMappingURL=update-app-menu.dto.js.map