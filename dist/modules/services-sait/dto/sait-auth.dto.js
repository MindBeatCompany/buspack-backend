"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaitAuthDto = void 0;
const openapi = require("@nestjs/swagger");
class SaitAuthDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { usuario: { required: true, type: () => String }, password: { required: true, type: () => String } };
    }
}
exports.SaitAuthDto = SaitAuthDto;
//# sourceMappingURL=sait-auth.dto.js.map