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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const generate_password_1 = require("generate-password");
const class_validator_1 = require("class-validator");
const fs_1 = require("fs");
const xlsx_1 = require("xlsx");
const user_entity_1 = require("./entities/user.entity");
const dtos_1 = require("./dtos");
const role_entity_1 = require("../role/entities/role.entity");
const app_roles_1 = require("../../shared/config/app.roles");
const account_entity_1 = require("../account/entities/account.entity");
const mail_service_1 = require("../mail/mail.service");
const constants_1 = require("../../shared/config/constants");
const strings_constants_1 = require("../../shared/config/strings-constants");
const return_messages_1 = require("../../shared/return-messages");
const entities_1 = require("./entities");
const path_1 = require("path");
let UserService = class UserService {
    constructor(userRepository, rolRepository, accountRepository, mailService, tariffRepository) {
        this.userRepository = userRepository;
        this.rolRepository = rolRepository;
        this.accountRepository = accountRepository;
        this.mailService = mailService;
        this.tariffRepository = tariffRepository;
    }
    async findOne(id, userLogged) {
        const user = await this.userRepository
            .findOne({ relations: ["role", "account"], where: { id } })
            .then((user) => !userLogged
            ? user
            : !!user && userLogged.companyName === user.account.companyName
                ? user
                : null);
        if (!user)
            throw new Error(`${strings_constants_1.default.noUserUnauthorized}`);
        return user;
    }
    async findAuthUser(userName) {
        const user = await this.userRepository
            .createQueryBuilder("user")
            .where({ email: userName })
            .orWhere("user.userName = :userName", { userName: userName })
            .addSelect("user.password")
            .addSelect("user.isActive")
            .addSelect("user.firstTimeLogged")
            .loadAllRelationIds()
            .getOne();
        return user;
    }
    async findAll(userLogged) {
        if (userLogged && userLogged.roles === app_roles_1.AppRoles.USER_ADMIN) {
            const users = await this.userRepository.find({
                relations: ["role", "account"],
                where: {
                    account: await this.accountRepository.findOne({
                        companyName: userLogged.companyName,
                    }),
                    isActive: true,
                },
            });
            if (!users) {
                throw new Error(strings_constants_1.default.userNotFound);
            }
            return users;
        }
        else if (!userLogged) {
            const users = await this.userRepository.find({
                relations: ["role", "account"],
            });
            if (!users)
                throw new Error(strings_constants_1.default.userNotFound);
            return users;
        }
        throw new Error(strings_constants_1.default.unauthorized);
    }
    async findAllAdmins(user) {
        if (user) {
            const adminUsers = await this.userRepository
                .createQueryBuilder("user")
                .innerJoinAndSelect("user.role", "role")
                .innerJoinAndSelect("user.account", "account")
                .where("account.id= :id", { id: user.account })
                .orHaving("role.name LIKE :userAdmin OR role.name LIKE :admin", {
                userAdmin: app_roles_1.AppRoles.USER_ADMIN,
                admin: app_roles_1.AppRoles.ADMIN,
            })
                .getMany();
            return adminUsers;
        }
        else {
            const rolRoot = await this.rolRepository.findOne({
                name: app_roles_1.AppRoles.ADMIN,
            });
            const rootAdmins = await this.userRepository.find({
                relations: ["role"],
                where: { role: rolRoot },
            });
            return rootAdmins;
        }
    }
    async findById(id) {
        return await this.userRepository.findOne({
            relations: ["role", "account"],
            where: { id },
        });
    }
    async create(newUser, userLogged) {
        const rol = await this.rolRepository
            .findOne({ id: newUser.rol })
            .then(async (result) => {
            if (result && result.id !== 1) {
                return result;
            }
        });
        if (!rol)
            throw new common_1.NotFoundException("Rol doesn't exists");
        const account = await this.accountRepository
            .findOne({ companyName: "nueva" ? "nueva".toUpperCase() : null })
            .then(async (result) => {
            if (result && result.companyName !== constants_1.DEFAULT_ACCOUNT_NAME) {
                return result;
            }
            else if (userLogged.roles === app_roles_1.AppRoles.ADMIN) {
                const newAccount = this.accountRepository.create({
                    companyName: "nueva",
                    codeECO: "25634565",
                });
                return await this.accountRepository.save(newAccount);
            }
        });
        if (!account)
            throw new common_1.NotFoundException("Account doesn't exists");
        const entity = this.userRepository.create({
            userName: newUser.userName,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            isActive: true,
            email: newUser.email,
            password: generate_password_1.generate({
                length: 10,
                numbers: true,
                symbols: true,
            }),
            role: rol,
            account: account,
        });
        const userExists = await this.userRepository.findOne({
            email: entity.email,
        }, { withDeleted: true });
        if (userExists)
            throw new common_1.HttpException("User already exists", common_1.HttpStatus.FOUND);
        await this.mailService.sendUserCredentials(entity);
        return await this.userRepository.save(entity).then(async (result) => {
            delete result.password;
            return result;
        });
    }
    async updateTariff(file, accountId) {
        return typeorm_2.getConnection().transaction(async (transaction) => {
            const account = await this.accountRepository
                .findOne({
                id: accountId,
            })
                .then(async (result) => {
                if (result) {
                    result.filePath = file.filename;
                    return await transaction.save(result);
                }
            });
            await typeorm_2.getConnection()
                .createQueryBuilder()
                .delete()
                .from(entities_1.TariffEntity)
                .where("accountId = :accountId", { accountId: accountId })
                .execute();
            const tariff = this.validateFile(file);
            await Promise.all(tariff.map(async (t) => {
                t.account = account;
                return await transaction.save(t);
            }));
        });
    }
    async createMultiAcounts(users, file) {
        return typeorm_2.getConnection().transaction(async (transaction) => {
            const tariff = this.validateFile(file);
            if (tariff) {
                const account = await this.accountRepository
                    .findOne({
                    companyName: users.companyName,
                })
                    .then(async (result) => {
                    if (result) {
                        result.filePath = file.filename;
                        return await transaction.save(result);
                    }
                    else {
                        const newAccount = this.accountRepository.create({
                            companyName: users.companyName,
                            idClientEntity: users.idClientEntity,
                            idClientAgent: users.idClientAgent,
                            cuit: users.cuit,
                            addressStreet: users.addressStreet,
                            addressNumber: users.addressNumber,
                            addressBuilding: users.addressBuilding,
                            addressFloor: users.addressFloor,
                            addressApartment: users.addressApartment,
                            locality: users.locality,
                            province: users.province,
                            country: users.country,
                            codeECO: users.codeEco,
                            accountType: users.accountType,
                            filePath: file.filename,
                            tariffType: users.tariffType
                        });
                        return await transaction.save(newAccount);
                    }
                });
                await Promise.all(tariff.map(async (t) => {
                    t.account = account;
                    return await transaction.save(t);
                }));
                const newUsers = await Promise.all(users.users.map(async (user) => {
                    const rol = await this.rolRepository.findOne({ id: user.rol });
                    return this.userRepository.create({
                        userName: user.userName,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: rol,
                        email: user.email,
                        password: generate_password_1.generate({
                            strict: true,
                            length: 10,
                            numbers: true,
                            symbols: true,
                        }),
                        account: account,
                        isActive: true,
                    });
                }));
                await this.findDuplicateUsers(newUsers);
                return await Promise.all(newUsers.map(async (u) => {
                    await this.mailService.sendUserCredentials(u);
                    const user = await transaction.save(u);
                    delete user.password;
                    return user;
                }));
            }
            else {
                throw new Error(strings_constants_1.default.invalidFile);
            }
        });
    }
    async createCorporateUsers(users) {
        return typeorm_2.getConnection().transaction(async (transaction) => {
            const account = await this.accountRepository
                .findOne({
                companyName: users.companyName,
            });
            const newUsers = await Promise.all(users.users.map(async (user) => {
                const rol = await this.rolRepository.findOne({ id: user.rol });
                return this.userRepository.create({
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: rol,
                    email: user.email,
                    password: generate_password_1.generate({
                        strict: true,
                        length: 10,
                        numbers: true,
                        symbols: true,
                    }),
                    account: account,
                    isActive: true,
                });
            }));
            await this.findDuplicateUsers(newUsers);
            return await Promise.all(newUsers.map(async (u) => {
                await this.mailService.sendUserCredentials(u);
                const user = await transaction.save(u);
                return user;
            }));
        });
    }
    async update(id, newValue, userLogged) {
        let user;
        if (userLogged.roles === app_roles_1.AppRoles.ADMIN) {
            user = await this.findOne(id);
        }
        else {
            user = await this.findOne(id, userLogged);
        }
        const rol = await this.rolRepository.findOne({ id: newValue.rol });
        if (rol) {
            user.role = rol;
        }
        const changeUser = this.userRepository.merge(user, newValue);
        await this.findDuplicate(user, newValue);
        if (newValue.passReset) {
            await this.userPasswordReset({ ids: [user.id] });
        }
        return await this.userRepository.save(changeUser);
    }
    async delete(id, userLogged) {
        const user = await this.userRepository.findOne({ id }, { relations: ["role", "account"] });
        if (!user)
            throw new common_1.NotFoundException("User does not exists");
        const account = await this.accountRepository.findOne({
            id: user.account.id,
        });
        const rol = await this.rolRepository.findOne({ id: user.role.id });
        if (userLogged.companyName !== account.companyName &&
            userLogged.roles !== app_roles_1.AppRoles.ADMIN)
            throw new common_1.ForbiddenException("Unauthorized");
        if (user.userName === userLogged.userName)
            throw new Error("Account could not be deleted");
        return await this.userRepository.softRemove(user).then((result) => {
            const userDeleted = {
                id: result.id,
                userName: result.userName,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email,
                isActive: result.isActive,
                role: rol,
                account: account,
                sessionTime: result.sessionTime,
                createdAt: result.createdAt,
            };
            return userDeleted;
        });
    }
    async addRole(idUser, idsRole) {
        const user = await this.findOne(idUser);
        const roles = idsRole.map(async (id) => {
            return await this.rolRepository.findOne({ id });
        });
        if (!roles)
            throw new common_1.NotFoundException("Rol doesn't exist");
        return this.userRepository.save(user);
    }
    async getUserPreferences(id, userLogged) {
        const user = await this.findOne(id, userLogged);
        if (userLogged.roles === app_roles_1.AppRoles.USER_ADMIN) {
            const preferences = {
                sessionTime: user.sessionTime,
            };
            return preferences;
        }
        else if (userLogged.id === user.id) {
            const preferences = {
                sessionTime: user.sessionTime,
            };
            return preferences;
        }
        throw new Error(strings_constants_1.default.unauthorized);
    }
    async updateUserPreferences(id, body, userLogged) {
        const user = await this.findOne(id, userLogged);
        const changePreference = this.userRepository.merge(user, body);
        const preferences = { sessionTime: user.sessionTime };
        if (userLogged && userLogged.roles === app_roles_1.AppRoles.USER_ADMIN) {
            await this.userRepository.save(changePreference);
            preferences.sessionTime = user.sessionTime;
            return preferences;
        }
        else if (userLogged && userLogged.id === user.id) {
            await this.userRepository.save(changePreference);
            return preferences;
        }
        else if (!userLogged) {
            await this.userRepository.save(changePreference);
            return preferences;
        }
        throw new Error(strings_constants_1.default.unauthorized);
    }
    async setStatus(body, userLogged) {
        const { isActive, ids } = body;
        const users = await this.userRepository.find({
            relations: ["role", "account"],
            where: { id: typeorm_2.In(ids) },
        });
        if (!users.length)
            throw new Error(strings_constants_1.default.userNotFound);
        users.map((u) => {
            if (userLogged.roles === app_roles_1.AppRoles.ADMIN) {
                return (u.isActive = isActive);
            }
            else if (userLogged.roles === app_roles_1.AppRoles.USER_ADMIN &&
                u.account.companyName === userLogged.companyName) {
                return (u.isActive = isActive);
            }
            else {
                throw new Error(strings_constants_1.default.unauthorized);
            }
        });
        return await this.userRepository.save(users);
    }
    async updateUserPass(user, newPass, firstTimeLogged) {
        user.password = newPass;
        user.firstTimeLogged = firstTimeLogged;
        user.isActive = true;
        return await this.userRepository.save(user);
    }
    async setSessionCounter(id, wrong) {
        if (wrong) {
            const user = await this.userRepository
                .createQueryBuilder("user")
                .where({ id })
                .addSelect("user.wrongSessionCounter")
                .getOne();
            if (user.wrongSessionCounter != 0) {
                user.wrongSessionCounter -= 1;
                await this.userRepository.save(user);
            }
            return user.wrongSessionCounter;
        }
        else {
            return await this.userRepository.findOne({ id }).then(async (result) => {
                result.wrongSessionCounter = 4;
                await this.userRepository.save(result);
                return result.wrongSessionCounter;
            });
        }
    }
    async blockUser(id) {
        const user = await this.userRepository.findOne({ id });
        user.isActive = false;
        user.firstTimeLogged = true;
        return await this.userRepository.save(user);
    }
    async userPasswordReset(body) {
        const { ids } = body;
        const users = await this.userRepository.findByIds(ids);
        return await Promise.all(users.map(async (u) => {
            u.password = generate_password_1.generate({
                strict: true,
                length: 10,
                numbers: true,
                symbols: true,
            });
            u.firstTimeLogged = true;
            u.isActive = true;
            await this.mailService.resendUserCredentials(u);
            await this.userRepository.save(u);
            delete u.password;
            return u;
        }));
    }
    validateFile(file) {
        if (!file) {
            throw new Error(strings_constants_1.default.invalidFile);
        }
        else if (!constants_1.MIMETYPES.includes(file.mimetype)) {
            fs_1.unlinkSync(file.path);
            throw new Error(strings_constants_1.default.invalidFileFormat);
        }
        const workbook = xlsx_1.readFile(file.path);
        workbook.Sheets[workbook.SheetNames[0]]["!ref"] = "A2:M102";
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const header = [
            "weightFrom",
            "weightTo",
            "caba",
            "amba",
            "inside_pba",
            "inside1",
            "inside2",
            "inside3",
            "inside4",
            "insurance",
            "homeDelivery",
            "homeWithdrawal",
            "otherAmounts",
        ];
        const letter = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
        ];
        const fillData = xlsx_1.utils.sheet_to_json(worksheet, {
            header,
            range: "C2:M102",
        });
        const rawData = xlsx_1.utils.sheet_to_json(worksheet, {
            header,
            range: "A3:M102",
        });
        const tariff = [];
        if (fillData.length > 0) {
            const errors = [];
            rawData.forEach((row_col) => {
                const data = Object.values(row_col);
                data.forEach((d, index) => {
                    if (typeof d !== "number") {
                        if (errors.length < 5) {
                            errors.push({
                                col: letter[header.indexOf(Object.keys(row_col)[index])],
                                row: row_col["__rowNum__"] + 1,
                            });
                        }
                    }
                });
                if (Object.keys(row_col).length > 2) {
                    tariff.push(this.tariffRepository.create(row_col));
                }
            });
            if (errors.length > 0) {
                fs_1.unlinkSync(file.path);
                throw new Error(strings_constants_1.default.invalidFile +
                    " " +
                    errors.map((e) => `[Columna: ${e.col} - Fila: ${e.row}]`));
            }
        }
        else {
            fs_1.unlinkSync(file.path);
            throw new Error(strings_constants_1.default.invalidFile);
        }
        return tariff;
    }
    async findDuplicateUsers(newUsers) {
        const users = await Promise.all(newUsers.map(async (u) => {
            return await this.userRepository.findOne({
                where: [{ email: u.email }, { userName: u.userName }],
                withDeleted: true,
            });
        }));
        if (users.some((u) => u !== undefined)) {
            const foundUsers = users.filter((u) => u !== undefined);
            throw new common_1.NotFoundException({
                message: strings_constants_1.default.userExist,
                users: foundUsers,
            });
        }
    }
    async findDuplicate(user, newValue) {
        const { email, userName } = newValue;
        const userFound = await this.userRepository.find({
            where: [
                { email, id: typeorm_2.Not(user.id) },
                { userName, id: typeorm_2.Not(user.id) },
            ],
            withDeleted: true,
        });
        if (userFound.length) {
            throw new common_1.NotFoundException({
                message: strings_constants_1.default.userExist,
                users: userFound,
            });
        }
    }
    async validateBody(body) {
        const jsonBody = JSON.parse(body);
        const dto = new dtos_1.CreateMultiUserDto();
        dto.companyName = jsonBody.companyName;
        if (jsonBody.idClientAgent === "") {
            dto.idClientAgent = null;
        }
        else {
            dto.idClientAgent = parseInt(jsonBody.idClientAgent);
        }
        if (jsonBody.idClientEntity === "") {
            dto.idClientEntity = null;
        }
        else {
            dto.idClientEntity = parseInt(jsonBody.idClientEntity);
        }
        dto.cuit = jsonBody.cuit;
        dto.addressStreet = jsonBody.addressStreet,
            dto.addressNumber = jsonBody.addressNumber;
        dto.addressBuilding = jsonBody.addressBuilding;
        dto.addressFloor = jsonBody.addressFloor;
        dto.addressApartment = jsonBody.addressApartment;
        dto.locality = jsonBody.locality;
        dto.province = jsonBody.province;
        dto.country = jsonBody.country;
        dto.accountType = jsonBody.accountType;
        dto.codeEco = jsonBody.codeEco;
        dto.users = jsonBody.users;
        dto.tariffType = jsonBody.tariffType;
        await class_validator_1.validate(dto).then((error) => {
            if (error.length > 0) {
                console.log("error:", error);
                throw new common_1.BadRequestException();
            }
        });
        for (let u in dto.users) {
            let valid = new dtos_1.CreateUserDto();
            valid.email = dto.users[u].email;
            valid.firstName = dto.users[u].firstName;
            valid.isActive = dto.users[u].isActive;
            valid.lastName = dto.users[u].lastName;
            valid.rol = dto.users[u].rol;
            valid.userName = dto.users[u].userName;
            await class_validator_1.validate(valid).then((error) => {
                if (error.length > 0) {
                    throw new common_1.BadRequestException();
                }
                dto.users[u] = valid;
            });
        }
        return dto;
    }
    async downloadFile(accountId) {
        const account = await this.accountRepository.find({
            where: { id: accountId },
        });
        let options;
        if (account.length === 0 || !account[0].filePath) {
            options = {
                root: path_1.join(__dirname, "../../shared/template-files/"),
                file: "tarifario.xlsx",
            };
        }
        else {
            options = {
                root: path_1.join(__dirname, "../account/tarifarios/"),
                file: account[0].filePath,
            };
        }
        try {
            if (fs_1.readdirSync(options.root).includes(options.file)) {
                return options;
            }
            else {
                throw new Error(strings_constants_1.default.fileNotFound);
            }
        }
        catch (error) {
            throw new Error(strings_constants_1.default.fileNotFound);
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(1, typeorm_1.InjectRepository(role_entity_1.RoleEntity)),
    __param(2, typeorm_1.InjectRepository(account_entity_1.AccountEntity)),
    __param(4, typeorm_1.InjectRepository(entities_1.TariffEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map