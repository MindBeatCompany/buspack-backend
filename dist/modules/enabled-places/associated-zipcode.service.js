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
exports.AssociatedZipcodeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const strings_constants_1 = require("../../shared/config/strings-constants");
const typeorm_2 = require("typeorm");
const location_entity_1 = require("./entities/location.entity");
let AssociatedZipcodeService = class AssociatedZipcodeService {
    constructor(localityEntity) {
        this.localityEntity = localityEntity;
    }
    async getLocality(enabledPlace) {
        const locality = await this.localityEntity.findOne({
            enabled_place: enabledPlace,
        });
        if (!locality) {
            return Promise.reject(new Error(strings_constants_1.default.localityError));
        }
        return Promise.resolve(locality);
    }
    async getEnabledPlacesLocal(fields) {
        try {
            const locality = await this.localityEntity.find({
                select: [...fields],
                where: { "isActive": true }
            });
            return locality;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
AssociatedZipcodeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(location_entity_1.LocalityEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AssociatedZipcodeService);
exports.AssociatedZipcodeService = AssociatedZipcodeService;
//# sourceMappingURL=associated-zipcode.service.js.map