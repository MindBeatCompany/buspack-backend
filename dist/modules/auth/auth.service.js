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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const generate_password_1 = require("generate-password");
const role_service_1 = require("../role/role.service");
const account_service_1 = require("../account/account.service");
const mail_service_1 = require("../mail/mail.service");
const strings_constants_1 = require("../../shared/config/strings-constants");
const return_messages_1 = require("../../shared/return-messages");
let AuthService = class AuthService {
    constructor(usersService, jwtService, roleService, accountService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.roleService = roleService;
        this.accountService = accountService;
        this.mailService = mailService;
    }
    async validateUser(payload) {
        const { password, userName } = payload;
        const user = await this.usersService.findAuthUser(userName);
        if (user) {
            if (await bcrypt_1.compare(password, user.password)) {
                const counter = await this.usersService.setSessionCounter(user.id, false);
                return await this.createToken(user);
            }
            else {
                const counter = await this.usersService.setSessionCounter(user.id, true);
                if (counter > 0) {
                    throw new Error(strings_constants_1.default.failedCredencials +
                        `\n Quedan ${counter} intentos antes de bloquear su cuenta.`);
                }
                else {
                    this.usersService.blockUser(user.id);
                    throw new Error(`${strings_constants_1.default.blockUser}`);
                }
            }
        }
        else {
            throw new Error(strings_constants_1.default.failedCredencials);
        }
    }
    async createToken(user) {
        const { id, email, role } = user, rest = __rest(user, ["id", "email", "role"]);
        if (user.isActive) {
            const rol = await this.roleService
                .findOne({ id: role })
                .catch(() => null);
            const account = await this.accountService
                .findOne({ id: user.account })
                .catch(() => null);
            const payload = { id, email };
            const userLogged = {
                id: id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: user.isActive,
                firstTimeLogged: user.firstTimeLogged,
                sessionTime: user.sessionTime,
                createdAt: user.createdAt,
                companyName: account.companyName,
                codeECO: account.codeECO,
                account,
                roles: rol.name,
                token: this.jwtService.sign(payload),
            };
            return userLogged;
        }
        throw new Error(strings_constants_1.default.inactiveUser);
    }
    async newUser(body) {
        const user = await this.usersService.findAuthUser(body.email);
        if (user) {
            throw new common_1.HttpException("User already exists", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async changePass(body, userLogged) {
        const user = await this.usersService.findAuthUser(userLogged.userName);
        if (await bcrypt_1.compare(body.oldPass, user.password)) {
            return await this.usersService
                .updateUserPass(user, body.newPass, false)
                .then(async (result) => await this.createToken(result));
        }
        throw new Error(strings_constants_1.default.passNoMatch);
    }
    async recovery(body) {
        const { userName } = body;
        const user = await this.usersService.findAuthUser(userName);
        if (user) {
            const newPass = generate_password_1.generate({
                strict: true,
                length: 10,
                numbers: true,
                symbols: false,
            });
            return await this.usersService
                .updateUserPass(user, newPass, true)
                .then(async (result) => {
                result.password = newPass;
                await this.mailService.resendUserCredentials(result);
                this.sendNotify(result, true);
                return return_messages_1.default(strings_constants_1.default.recoveryMessage);
            });
        }
        this.sendNotify(null, false, body);
        return return_messages_1.default(strings_constants_1.default.recoveryMessage);
    }
    async sendNotify(user, correct, body) {
        if (correct) {
            const usersAdmin = await this.usersService.findAllAdmins(user);
            usersAdmin.map(async (admin) => {
                await this.mailService.sendRecoveryPass(user, admin);
            });
        }
        else {
            const usersAdmin = await this.usersService.findAllAdmins(user);
            usersAdmin.map(async (admin) => {
                await this.mailService.sendWrongRecovery(body, admin);
            });
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        role_service_1.RoleService,
        account_service_1.AccountService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map