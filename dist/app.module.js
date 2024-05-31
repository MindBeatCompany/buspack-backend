"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const nest_access_control_1 = require("nest-access-control");
const app_roles_1 = require("./shared/config/app.roles");
const appmenu_module_1 = require("./modules/appmenu/appmenu.module");
const role_module_1 = require("./modules/role/role.module");
const constants_1 = require("./shared/config/constants");
const service_request_module_1 = require("./modules/service-request/service-request.module");
const account_module_1 = require("./modules/account/account.module");
const mail_module_1 = require("./modules/mail/mail.module");
const print_labels_module_1 = require("./modules/print-labels/print-labels.module");
const general_settings_module_1 = require("./modules/general-settings/general-settings.module");
const services_sait_module_1 = require("./modules/services-sait/services-sait.module");
const enabled_places_module_1 = require("./modules/enabled-places/enabled-places.module");
const database_config_1 = require("./shared/config/database.config");
const schedule_1 = require("@nestjs/schedule");
const pricing_module_1 = require("./modules/pricing/pricing.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => config.get(constants_1.TYPEORM_CONFIG),
            }),
            config_1.ConfigModule.forRoot({
                load: [database_config_1.default],
                isGlobal: true,
                envFilePath: ".env",
            }),
            schedule_1.ScheduleModule.forRoot(),
            nest_access_control_1.AccessControlModule.forRoles(app_roles_1.roles),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            appmenu_module_1.AppmenuModule,
            role_module_1.RoleModule,
            service_request_module_1.ServiceRequestModule,
            account_module_1.AccountModule,
            mail_module_1.MailModule,
            print_labels_module_1.PrintLabelsModule,
            general_settings_module_1.GeneralSettingsModule,
            services_sait_module_1.ServicesSaitModule,
            enabled_places_module_1.EnabledPlacesModule,
            pricing_module_1.PricingModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map