"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../user/user.module");
const constants_1 = require("../../shared/config/constants");
const passport_1 = require("@nestjs/passport");
const strategies_1 = require("./strategies");
const role_module_1 = require("../role/role.module");
const account_module_1 = require("../account/account.module");
const mail_service_1 = require("../mail/mail.service");
const mail_module_1 = require("../mail/mail.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            mail_module_1.MailModule,
            passport_1.PassportModule.register({
                defaultStrategy: "jwt",
            }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: async (consfig) => ({
                    secret: consfig.get(constants_1.JWT_SECRET),
                    signOptions: { expiresIn: consfig.get(constants_1.EXPIRE_TOKEN_IN) },
                }),
            }),
            user_module_1.UserModule,
            role_module_1.RoleModule,
            account_module_1.AccountModule,
            mail_service_1.MailService,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, strategies_1.LocalStrategy, strategies_1.JwtStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map