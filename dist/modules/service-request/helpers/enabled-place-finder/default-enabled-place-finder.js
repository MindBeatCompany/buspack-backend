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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const abstract_enabled_place_finder_1 = require("./abstract-enabled-place-finder");
const location_entity_1 = require("../../../enabled-places/entities/location.entity");
let DefaultEnabledPlaceFinder = class DefaultEnabledPlaceFinder extends abstract_enabled_place_finder_1.default {
    constructor(localityRepository) {
        super();
        this.localityRepository = localityRepository;
    }
    async find(data) {
        const enabledPlace = data.enabledPlace;
        const locality = data.locality;
        const cpa = data.cpa;
        const province = data.province;
        if (data.homeDelivery.value === "NO") {
            if (enabledPlace.status == "ok" && cpa.status == "ok") {
                await this.localityRepository.find({
                    where: {
                        enabled_place: enabledPlace.value,
                    },
                }).then(place => {
                    if (place.length == 0) {
                        enabledPlace.status = "danger";
                        enabledPlace.error = "Este lugar no esta actualmente habilitado";
                        locality.status = "danger";
                        locality.error = "La localidad no pertence a un lugar habilitado";
                        province.status = "danger";
                        province.error = "La provincia no pertence a un lugar habilitado";
                        cpa.status = "danger";
                        cpa.error = "El codigo Postal no pertence a un lugar habilitado";
                    }
                    else {
                        if (place[0].zip_code != cpa.value) {
                            cpa.status = "danger";
                            cpa.error = "El codigo Postal no pertence a un lugar habilitado";
                        }
                    }
                });
            }
        }
        else {
            await this.localityRepository.find({
                where: {
                    zip_code: data.addressCpa.value,
                },
            });
        }
        data.enabledPlace = enabledPlace;
        data.locality = locality;
        data.cpa = cpa;
        data.province = province;
        return data;
    }
};
DefaultEnabledPlaceFinder = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(location_entity_1.LocalityEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DefaultEnabledPlaceFinder);
exports.default = DefaultEnabledPlaceFinder;
//# sourceMappingURL=default-enabled-place-finder.js.map