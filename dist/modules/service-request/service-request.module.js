"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_request_controller_1 = require("./service-request.controller");
const service_request_service_1 = require("./service-request.service");
const account_entity_1 = require("../account/entities/account.entity");
const service_request_entity_1 = require("./entities/service-request.entity");
const general_settings_entity_1 = require("../general-settings/entities/general-settings.entity");
const services_sait_module_1 = require("../services-sait/services-sait.module");
const tariff_entity_1 = require("../user/entities/tariff.entity");
const zonescp_entity_1 = require("../enabled-places/entities/zonescp.entity");
const location_entity_1 = require("../enabled-places/entities/location.entity");
const enabled_places_entity_1 = require("../enabled-places/entities/enabled-places.entity");
const format_sr_entity_1 = require("./entities/format-sr.entity");
const field_number_sr_entity_1 = require("./entities/field-number-sr.entity");
const field_boolean_sr_entity_1 = require("./entities/field-boolean-sr.entity");
const field_string_sr_entity_1 = require("./entities/field-string-sr.entity");
const header_getter_1 = require("./helpers/header-getter");
const account_locality_entity_1 = require("./entities/account-locality.entity");
const format_enabled_place_finder_1 = require("./helpers/enabled-place-finder/format-enabled-place-finder");
const default_service_request_validator_1 = require("./helpers/validators/default-service-request-validator");
const format_service_request_validator_1 = require("./helpers/validators/format-service-request-validator");
const default_enabled_place_finder_1 = require("./helpers/enabled-place-finder/default-enabled-place-finder");
const format_separator_validator_1 = require("./helpers/validators/format-separator-validator");
const update_fsr_validator_1 = require("./helpers/validators/update-fsr-validator");
const enabled_places_service_1 = require("../enabled-places/enabled-places.service");
const config_1 = require("@nestjs/config");
const provider_constant_1 = require("../../shared/config/provider.constant");
const planilla_excel_entity_1 = require("./entities/planilla_excel.entity");
let ServiceRequestModule = class ServiceRequestModule {
};
ServiceRequestModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule,
            services_sait_module_1.ServicesSaitModule,
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.AccountEntity,
                service_request_entity_1.ServiceRequestEntity,
                tariff_entity_1.TariffEntity,
                zonescp_entity_1.ZonesEntity,
                general_settings_entity_1.GeneralSettingsEntity,
                location_entity_1.LocalityEntity,
                enabled_places_entity_1.EnabledPlaceEntity,
                format_sr_entity_1.default,
                field_number_sr_entity_1.default,
                field_boolean_sr_entity_1.default,
                field_string_sr_entity_1.default,
                account_locality_entity_1.default,
                planilla_excel_entity_1.default,
            ])
        ],
        controllers: [service_request_controller_1.ServiceRequestController],
        providers: [enabled_places_service_1.EnabledPlacesService,
            service_request_service_1.ServiceRequestService,
            header_getter_1.default,
            format_enabled_place_finder_1.default,
            default_enabled_place_finder_1.default,
            default_service_request_validator_1.default,
            format_service_request_validator_1.default,
            format_separator_validator_1.default,
            update_fsr_validator_1.default,
            planilla_excel_entity_1.default, {
                provide: provider_constant_1.ProviderConstant.SAIT_BASE_URL,
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get(provider_constant_1.ProviderConstant.SAIT_BASE_URL),
            },
            {
                provide: provider_constant_1.ProviderConstant.SAIT_TOKEN_API,
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get(provider_constant_1.ProviderConstant.SAIT_TOKEN_API),
            },]
    })
], ServiceRequestModule);
exports.ServiceRequestModule = ServiceRequestModule;
//# sourceMappingURL=service-request.module.js.map