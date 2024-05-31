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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("../account/entities/account.entity");
const location_entity_1 = require("../enabled-places/entities/location.entity");
const get_minimal_accounts_response_dto_1 = require("./dtos/response/get-minimal-accounts-response.dto");
const area_entity_1 = require("./entities/area.entity");
const pricing_entity_1 = require("./entities/pricing.entity");
const get_pricing_to_clone_dto_1 = require("./dtos/response/get-pricing-to-clone.dto");
let PricingService = class PricingService {
    constructor(pricingRepository, areaRepository, localityRepository, accountRepository) {
        this.pricingRepository = pricingRepository;
        this.areaRepository = areaRepository;
        this.localityRepository = localityRepository;
        this.accountRepository = accountRepository;
    }
    async create(pricingDto) {
        const desiredAccount = await this.accountRepository.findOneOrFail({ id: pricingDto.accountId }, { relations: ["pricings"] });
        const validDate = pricingDto.validSince;
        validDate.setHours(0, 0, 0, 0);
        this.checkIfIsValidPricing(desiredAccount, pricingDto);
        const newPricing = this.pricingRepository.create({
            name: pricingDto.name,
            validSince: validDate,
            areas: [],
            account: desiredAccount
        });
        await this.generateAreas(pricingDto.areas, newPricing);
        const pricing = await this.pricingRepository.save(newPricing);
        const { pricings } = desiredAccount, account = __rest(desiredAccount, ["pricings"]);
        return Object.assign(Object.assign({}, pricing), { account });
    }
    getPricingFrom(accountId) {
        return this.accountRepository.findOneOrFail({ id: accountId }, { relations: ["pricings"] })
            .then(account => {
            this.checkExistCurrentPricingTable(account);
            return account.currentPricing();
        });
    }
    getPricingToClone(accountId) {
        return this.accountRepository.findOneOrFail({ id: accountId }, { relations: ["pricings"] })
            .then(account => {
            this.checkExistCurrentPricingTable(account);
            return new get_pricing_to_clone_dto_1.PricingToCloneDto(account.currentPricing());
        });
    }
    async getAccountsWithPricing() {
        const accounts = await this.accountRepository.find({ relations: ['pricings'] });
        return accounts.filter(account => account.haveCurrentPricing()).map(it => new get_minimal_accounts_response_dto_1.MinimalAccountDto(it));
    }
    async getAllLocalities() {
        return this.localityRepository.find({
            where: {
                isActive: true,
            },
            select: ["locality_name", "province_name", "zip_code"],
        }).then(persistedLocalities => persistedLocalities.reduce((ls, l) => {
            if (!ls.some(it => it.locality_name === l.locality_name && it.zip_code === l.zip_code)) {
                ls.push(l);
            }
            return ls;
        }, []));
    }
    updatePricingTableFrom(accountId, body) {
        return this.accountRepository
            .findOneOrFail({ id: accountId }, { relations: ["pricings"] })
            .then(account => {
            this.checkExistCurrentPricingTable(account);
            account.updateCurrentPrices(body);
            return this.pricingRepository.save(account.currentPricing());
        });
    }
    checkIfIsValidPricing(account, pricingDto) {
        const validDate = pricingDto.validSince;
        validDate.setHours(0, 0, 0, 0);
        account.validatePricing(pricingDto.name, validDate);
        this.checkIfExistADuplicatedLocality(pricingDto.areas);
        if (pricingDto.areas.length !== (new Set(pricingDto.areas.map(it => it.name.toLocaleLowerCase()))).size) {
            throw new Error("Existen zonas con nombres duplicados");
        }
    }
    checkIfExistADuplicatedLocality(areas) {
        const localities = areas.reduce((ls, l) => {
            return ls.concat(l.localities);
        }, []);
        const localitiesWithoutDuplicates = localities.reduce((ls, l) => {
            if (!ls.some(it => it.name === l.name && it.zipCode === l.zipCode)) {
                ls.push(l);
            }
            return ls;
        }, []);
        if (localities.length !== localitiesWithoutDuplicates.length) {
            throw new Error("Hay al menos una localidad duplicada dentro o entre las zonas");
        }
    }
    checkExistCurrentPricingTable(account) {
        if (!account.pricings || account.currentPricing() === null) {
            throw new Error(`${account.companyName} no tiene un tarifario creado o vigente`);
        }
    }
    async findWithoutDuplicates(localities) {
        return this.localityRepository.find({
            where: {
                zip_code: typeorm_2.In(localities.map(it => it.zipCode)),
                locality_name: typeorm_2.In(localities.map(it => it.name))
            }
        }).then(persistedLocalities => persistedLocalities.reduce((ls, l) => {
            if (!ls.some(it => it.locality_name === l.locality_name && it.zip_code === l.zip_code)) {
                ls.push(l);
            }
            return ls;
        }, []));
    }
    async generateAreas(areas, pricing) {
        return await Promise.all(areas.map(async (areaData) => {
            const localities = await this.findWithoutDuplicates(areaData.localities);
            if (localities.length === 0) {
                throw new Error("Debe existir al menos una localidad para la zona " + areaData.name);
            }
            const area = this.areaRepository.create({
                name: areaData.name,
                finalKilogramValue: areaData.finalKilogramValue,
                increasedWeight: areaData.increasedWeight,
                startingTariffPrice: areaData.startingTariffPrice,
                tariffPriceIncrease: areaData.tariffPriceIncrease,
                insurance: areaData.insurance,
                homeDelivery: areaData.homeDelivery,
                homeWithdrawal: areaData.homeWithdrawal,
                others: areaData.others,
                additionalPriceIncrease: areaData.additionalPriceIncrease,
                priceTable: [],
                localities
            });
            pricing.addArea(area);
            return area;
        }));
    }
};
PricingService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(pricing_entity_1.PricingEntity)),
    __param(1, typeorm_1.InjectRepository(area_entity_1.AreaEntity)),
    __param(2, typeorm_1.InjectRepository(location_entity_1.LocalityEntity)),
    __param(3, typeorm_1.InjectRepository(account_entity_1.AccountEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PricingService);
exports.PricingService = PricingService;
//# sourceMappingURL=pricing.service.js.map