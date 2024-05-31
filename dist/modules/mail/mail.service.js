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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendUserCredentials(user) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Bienvenido/a a Hubbpack!",
            template: path_1.join(__dirname, "/templates/sendcredentials"),
            context: {
                name: user.firstName,
                url: process.env.URL_FRONTEND,
                username: user.userName,
                pass: user.password,
            },
        });
    }
    async resendUserCredentials(user) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: "Solicitud de Recupero Contraseña",
            template: path_1.join(__dirname, "/templates/resendcredentials"),
            context: {
                name: user.firstName,
                username: user.userName,
                pass: user.password,
            },
        });
    }
    async sendRecoveryPass(user, userAdmin) {
        await this.mailerService.sendMail({
            to: userAdmin.email,
            subject: "Pedido Recupero Contraseña",
            template: path_1.join(__dirname, "/templates/recoverypass"),
            context: {
                name: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    }
    async sendWrongRecovery(user, userAdmin) {
        await this.mailerService.sendMail({
            to: userAdmin.email,
            subject: "Pedido Recupero Contraseña Incorrecto",
            template: path_1.join(__dirname, "/templates/wrongrecovery"),
            context: {
                name: user.userName,
            },
        });
    }
};
MailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map