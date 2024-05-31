"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nest_access_control_1 = require("nest-access-control");
const guards_1 = require("../../modules/auth/guards");
const Auth = (...roles) => {
    return common_1.applyDecorators(common_1.UseGuards(guards_1.JwtAuthGuard, nest_access_control_1.ACGuard), nest_access_control_1.UseRoles(...roles));
};
exports.default = Auth;
//# sourceMappingURL=auth.decorator.js.map