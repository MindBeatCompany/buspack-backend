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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const strings_constants_1 = require("../../shared/config/strings-constants");
const crud_operations_interface_1 = require("../../shared/interfaces/crud-operations.interface");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const account_entity_1 = require("./entities/account.entity");
let AccountService = class AccountService {
    constructor(accountRepository, userRepository) {
        this.accountRepository = accountRepository;
        this.userRepository = userRepository;
    }
    async findAll(options) {
        const account = await this.accountRepository.find({
            where: {
                isActive: true,
                companyName: typeorm_2.Not(process.env.DEFAULT_ACCOUNT_NAME),
            },
        });
        return account;
    }
    async findById(id) {
        throw new Error("Method not implemented.");
    }
    async findOne(options, options2) {
        const account = await this.accountRepository.findOne(options);
        if (!account)
            throw new Error(strings_constants_1.default.noAccount);
        return account;
    }
    async create(entity, options) {
        throw new Error("Method not implemented.");
    }
    async update(id, newValue) {
        const accountFound = await this.accountRepository.findOne({ id });
        if (!accountFound)
            throw new Error(strings_constants_1.default.noAccount);
        const updatedAccount = this.accountRepository.merge(accountFound, newValue);
        return await this.accountRepository.save(updatedAccount);
    }
    async delete(id) {
        throw new Error("Method not implemented.");
    }
    async deactivate(account) {
        const daccounts = await this.accountRepository.findByIds(account.ids);
        if (!daccounts.length)
            throw new Error(strings_constants_1.default.noAccount);
        daccounts.forEach((d) => {
            d.isActive = account.isActive;
        });
        const users = await this.userRepository.find({
            relations: ["account"],
            where: { account: typeorm_2.In(daccounts.map((d) => d.id)) },
        });
        users.forEach((u) => {
            u.isActive = account.isActive;
        });
        await this.userRepository.save(users);
        await this.accountRepository.save(daccounts);
        return daccounts;
    }
    async getUsers(id) {
        const users = await this.userRepository.find({
            relations: ["role", "account"],
            where: { account: await this.accountRepository.findOne({ id }) },
        });
        if (!users.length)
            throw new Error(strings_constants_1.default.userNotFound);
        return users;
    }
    async getAccountByCuit(cuit) {
        const accountsFinded = await this.accountRepository.find({
            where: { cuit }
        });
        if (!accountsFinded.length) {
            return [];
        }
        return accountsFinded;
    }
    async changeHasCustomPricing(id, newStatus) {
        const accountFound = await this.accountRepository.findOne({ id });
        if (!accountFound)
            throw new Error(strings_constants_1.default.noAccount);
        accountFound.hasCustomPricing = newStatus;
        return await this.accountRepository.save(accountFound);
    }
};
AccountService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(account_entity_1.AccountEntity)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map