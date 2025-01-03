"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const role_entity_1 = require("../role/entities/role.entity");
const account_entity_1 = require("../account/entities/account.entity");
const mail_module_1 = require("../mail/mail.module");
const mail_service_1 = require("../mail/mail.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    common_1.Module({
        imports: [
            mail_module_1.MailModule,
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.TariffEntity,
                entities_1.UserEntity,
                role_entity_1.RoleEntity,
                account_entity_1.AccountEntity,
            ]),
        ],
        providers: [user_service_1.UserService, mail_service_1.MailService],
        controllers: [user_controller_1.UserController],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map