"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnabledPlacesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const provider_constant_1 = require("../../shared/config/provider.constant");
const strings_constants_1 = require("../../shared/config/strings-constants");
const typeorm_2 = require("typeorm");
const enabled_places_entity_1 = require("./entities/enabled-places.entity");
const services_sait_service_1 = require("../services-sait/services-sait.service");
let EnabledPlacesService = class EnabledPlacesService {
    constructor(http, enabledPlaceRepository, saitBaseUrl, saitTokenApi, serviceSaitService) {
        this.http = http;
        this.enabledPlaceRepository = enabledPlaceRepository;
        this.saitBaseUrl = saitBaseUrl;
        this.saitTokenApi = saitTokenApi;
        this.serviceSaitService = serviceSaitService;
        this.enabledPlacesURL = `/sait/destinosHabilitados?token=`;
    }
    async getEnabledPlacesSait() {
        let token = await this.serviceSaitService.saitAccessToken();
        return this.http
            .get(`${this.saitBaseUrl}${this.enabledPlacesURL}${token.token}`)
            .toPromise()
            .then((data) => {
            if (data.status === 201) {
                if (Array.isArray(data.data.registros)) {
                    return data.data.registros
                        .map((location) => this.mapperOut(location))
                        .filter((location) => location);
                }
            }
            return [];
        })
            .then((locations) => {
            return this.save(locations);
        })
            .catch((error) => {
            console.error(error);
            throw new Error(strings_constants_1.default.enabledPlace);
        });
    }
    async getEnabledPlacesSaitForValidator() {
        try {
            let token = await this.serviceSaitService.saitAccessToken();
            const data = await this.http
                .get(`${this.saitBaseUrl}${this.enabledPlacesURL}${token.token}`)
                .toPromise();
            if (data.status === 201 && Array.isArray(data.data.registros)) {
                return data.data.registros.map((location) => this.mapperOut(location));
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error(error);
            throw new Error(strings_constants_1.default.enabledPlace);
        }
    }
    async save(locations) {
        await this.enabledPlaceRepository.clear();
        for (let index = 0; index < locations.length; index++) {
            const newLocation = this.enabledPlaceRepository.create(locations[index]);
            await this.enabledPlaceRepository.save(newLocation);
        }
    }
    mapperOut(location) {
        if (location.Activo === "1") {
            return {
                idog: location.IDOG,
                isActive: location.Activo,
                code: location.Codigo,
                place_name: location.Nombre,
                type_description: location.DescTipo,
                locality_name: location.Localidad,
                province_name: location.Provincia,
            };
        }
        return null;
    }
};
EnabledPlacesService = __decorate([
    common_1.Injectable(),
    __param(1, typeorm_1.InjectRepository(enabled_places_entity_1.EnabledPlaceEntity)),
    __param(2, common_1.Inject(provider_constant_1.ProviderConstant.SAIT_BASE_URL)),
    __param(3, common_1.Inject(provider_constant_1.ProviderConstant.SAIT_TOKEN_API)),
    __metadata("design:paramtypes", [common_1.HttpService,
        typeorm_2.Repository, String, String, services_sait_service_1.ServicesSaitService])
], EnabledPlacesService);
exports.EnabledPlacesService = EnabledPlacesService;
//# sourceMappingURL=enabled-places.service.js.map