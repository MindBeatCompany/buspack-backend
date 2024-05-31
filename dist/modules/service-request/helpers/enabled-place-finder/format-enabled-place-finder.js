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
const account_locality_entity_1 = require("../../entities/account-locality.entity");
const enabled_places_entity_1 = require("../../../enabled-places/entities/enabled-places.entity");
const location_entity_1 = require("../../../enabled-places/entities/location.entity");
let FormatEnabledPlaceFinder = class FormatEnabledPlaceFinder {
    constructor(accountLocalityRepository, enabledPlaceRepository) {
        this.accountLocalityRepository = accountLocalityRepository;
        this.enabledPlaceRepository = enabledPlaceRepository;
    }
    async find(enabledPlace, locality, province, cpa, accountLocalities, dtv) {
        let res = {
            enabledPlace: Object.assign({}, enabledPlace),
            locality: Object.assign({}, locality),
            province: Object.assign({}, province),
            cpa: Object.assign({}, cpa)
        };
        let fieldsToMakeFind = this.getFieldsToMakeFind({
            locality: Object.assign({}, locality),
            province: Object.assign({}, province),
            cpa: Object.assign({}, cpa)
        });
        let accountLocalityMatch = accountLocalities.find(al => this.findAccountLocalityMatch(al, fieldsToMakeFind));
        let enabledPlaceRes = null;
        if (accountLocalityMatch != undefined) {
            try {
                enabledPlaceRes = await this.enabledPlaceRepository
                    .createQueryBuilder("ep")
                    .innerJoinAndSelect(location_entity_1.LocalityEntity, "l", "ep.place_name = l.enabled_place")
                    .where("ep.id = :enabledPlaceId", { enabledPlaceId: accountLocalityMatch.enabledPlaceId })
                    .andWhere("ep.isActive = true")
                    .getRawOne();
            }
            catch (e) {
                throw new Error(e);
            }
            if (enabledPlaceRes) {
                res.enabledPlace.value = enabledPlaceRes.ep_place_name;
                res.enabledPlace.status = "ok";
                res.locality.value = enabledPlaceRes.l_locality_name;
                res.province.value = enabledPlaceRes.l_province_name;
                res.cpa.value = enabledPlaceRes.l_zip_code;
            }
            else {
                res = this.setEPNotFoundError(res, dtv);
            }
        }
        else {
            res = this.setEPNotFoundError(res, dtv);
        }
        return res;
    }
    setEPError(value, field, msge) {
        field.status = "danger";
        field.value = value;
        field.error = msge;
        return field;
    }
    setEPNotFoundError(res, dtv) {
        const notIgnoredFields = this.notIgnoredFields(dtv);
        notIgnoredFields.map(nif => {
            if (nif.fieldName === "locality") {
                res.locality.status = "danger";
                res.locality.error = this.getReviewThisFielMsge();
            }
            if (nif.fieldName === "province") {
                res.province.status = "danger";
                res.province.error = this.getReviewThisFielMsge();
            }
            if (nif.fieldName === "cpa") {
                res.cpa.status = "danger";
                res.cpa.error = this.getReviewThisFielMsge();
            }
        });
        res.enabledPlace = this.setEPError("", res.enabledPlace, "No se pudo encontrar el lugar habilitado con la información brindada");
        return res;
    }
    getReviewThisFielMsge() {
        return "Revise este campo para obtener el lugar habilitado y vuelva a subir el archivo";
    }
    notIgnoredFields(dtv) {
        let res = [];
        dtv.forEach(d => {
            if (d.position !== null) {
                res.push(d);
            }
        });
        return res;
    }
    findAccountLocalityMatch(accountLocality, fieldsToMakeFind) {
        const ftmf = fieldsToMakeFind;
        const ftmfAL = this.getFieldsToMakeFindAL(accountLocality);
        const ftmfALKeys = ftmfAL.map(f => Object.keys(f)[0]);
        let canFindAL = true;
        for (let i = 0; i < ftmfALKeys.length; i++) {
            let ftmfALvalue = this.getEpFieldValue(ftmfAL, ftmfALKeys[i]);
            let ftmfValue = this.getEpFieldValue(ftmf, ftmfALKeys[i]);
            if (ftmfValue != null && canFindAL) {
                canFindAL = canFindAL && this.doesEPValuesMatch(ftmfALvalue, ftmfValue);
            }
            else {
                return null;
            }
        }
        if (canFindAL) {
            return accountLocality;
        }
        else {
            return null;
        }
    }
    doesEPValuesMatch(valueGiven, valueToCompare) {
        const regex = this.getFieldRegex(valueGiven.trim());
        valueToCompare = valueToCompare.trim();
        return Boolean(valueToCompare.match(regex));
    }
    getEpFieldValue(fieldsToMakeFind, key) {
        let res = fieldsToMakeFind.find(f => Object.keys(f)[0] === key);
        if (res) {
            return res[key];
        }
        return res;
    }
    getFieldsToMakeFindAL(accountLocality) {
        let res = [];
        if (accountLocality.locality !== null)
            res.push({ "locality": accountLocality.locality });
        if (accountLocality.province !== null)
            res.push({ "province": accountLocality.province });
        if (accountLocality.cp !== null)
            res.push({ "cpa": accountLocality.cp });
        return res;
    }
    getFieldRegex(value) {
        const pattern = `^${value}$`;
        return new RegExp(pattern, 'i');
    }
    getFieldsToMakeFind(fields) {
        let res = [];
        let keys = Object.keys(fields);
        keys.map((k) => {
            let value = fields[k].value;
            if (value !== null && !value.match(/^ *$/)) {
                res.push({ [k]: value });
            }
        });
        return res;
    }
};
FormatEnabledPlaceFinder = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(account_locality_entity_1.default)),
    __param(1, typeorm_1.InjectRepository(enabled_places_entity_1.EnabledPlaceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FormatEnabledPlaceFinder);
exports.default = FormatEnabledPlaceFinder;
//# sourceMappingURL=format-enabled-place-finder.js.map