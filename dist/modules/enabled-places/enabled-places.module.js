"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnabledPlacesModule = void 0;
const common_1 = require("@nestjs/common");
const enabled_places_controller_1 = require("./enabled-places.controller");
const enabled_places_service_1 = require("./enabled-places.service");
const typeorm_1 = require("@nestjs/typeorm");
const enabled_places_entity_1 = require("./entities/enabled-places.entity");
const provider_constant_1 = require("../../shared/config/provider.constant");
const config_1 = require("@nestjs/config");
const associated_zipcode_service_1 = require("./associated-zipcode.service");
const associated_zipcode_entity_1 = require("./entities/associated-zipcode.entity");
const location_entity_1 = require("./entities/location.entity");
const services_sait_module_1 = require("../services-sait/services-sait.module");
let EnabledPlacesModule = class EnabledPlacesModule {
};
EnabledPlacesModule = __decorate([
    common_1.Module({
        imports: [common_1.HttpModule, services_sait_module_1.ServicesSaitModule, typeorm_1.TypeOrmModule.forFeature([enabled_places_entity_1.EnabledPlaceEntity, associated_zipcode_entity_1.AssociatedZipCodeEntity, location_entity_1.LocalityEntity])],
        controllers: [enabled_places_controller_1.EnabledPlacesController],
        providers: [
            enabled_places_service_1.EnabledPlacesService,
            {
                provide: provider_constant_1.ProviderConstant.SAIT_BASE_URL,
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get(provider_constant_1.ProviderConstant.SAIT_BASE_URL),
            },
            {
                provide: provider_constant_1.ProviderConstant.SAIT_TOKEN_API,
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get(provider_constant_1.ProviderConstant.SAIT_TOKEN_API),
            },
            associated_zipcode_service_1.AssociatedZipcodeService,
        ],
    })
], EnabledPlacesModule);
exports.EnabledPlacesModule = EnabledPlacesModule;
//# sourceMappingURL=enabled-places.module.js.map