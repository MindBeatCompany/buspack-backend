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
exports.GeneralSettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const strings_constants_1 = require("../../shared/config/strings-constants");
const return_messages_1 = require("../../shared/return-messages");
const typeorm_2 = require("typeorm");
const general_settings_entity_1 = require("./entities/general-settings.entity");
let GeneralSettingsService = class GeneralSettingsService {
    constructor(generalSettingsRepository) {
        this.generalSettingsRepository = generalSettingsRepository;
        this.generalId = 123123123;
    }
    async findById() {
        let settings;
        try {
            settings = await this.generalSettingsRepository.findOne({
                id: this.generalId,
            });
        }
        catch (error) {
            throw new Error(`${strings_constants_1.default.generalSettingsError} - ${error}`);
        }
        if (!settings) {
            throw new Error(strings_constants_1.default.generalSettingsNotFound);
        }
        return settings;
    }
    async create(entity, options) {
        entity.id = this.generalId;
        const settings = await this.generalSettingsRepository.find();
        if (settings.length === 1) {
            throw new Error(strings_constants_1.default.generalSettingsOnlyOne);
        }
        const newSettings = this.generalSettingsRepository.create(entity);
        return await this.generalSettingsRepository.save(newSettings);
    }
    async update(newValue) {
        const setting = await this.generalSettingsRepository.findOne({
            id: this.generalId,
        });
        if (!setting) {
            throw new Error(strings_constants_1.default.generalSettingsNotFound);
        }
        const settingUpdated = {
            id: this.generalId,
            descLugarOrigen: newValue.descLugarOrigen,
            idLugarOrigen: newValue.idLugarOrigen,
            idSeguro: newValue.idSeguro,
            letraComprobante: newValue.letraComprobante,
            bocaComprobante: newValue.bocaComprobante,
            idRetiroADomicilio: newValue.idRetiroADomicilio,
            idEntregaDomicilio: newValue.idEntregaDomicilio,
            idAgenciaOrigen: newValue.idAgenciaOrigen,
            descAgenciaOrigen: newValue.descAgenciaOrigen,
            domicilioAgenciaOrigen: newValue.domicilioAgenciaOrigen,
            telefonoAgenciaOrigen: newValue.telefonoAgenciaOrigen,
            cpAgenciaOrigen: newValue.cpAgenciaOrigen,
            otrosImportes: newValue.otrosImportes
        };
        return await this.generalSettingsRepository.save(settingUpdated);
    }
    async delete(id) {
        const setting = await this.generalSettingsRepository.findOne({ id: id });
        if (!setting) {
            return_messages_1.default(strings_constants_1.default.generalSettingsNotFound);
        }
        return this.generalSettingsRepository.remove(setting);
    }
};
GeneralSettingsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(general_settings_entity_1.GeneralSettingsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GeneralSettingsService);
exports.GeneralSettingsService = GeneralSettingsService;
//# sourceMappingURL=general-settings.service.js.map