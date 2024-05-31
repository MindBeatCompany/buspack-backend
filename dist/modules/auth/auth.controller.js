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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_roles_1 = require("../../shared/config/app.roles");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const return_messages_1 = require("../../shared/return-messages");
const auth_service_1 = require("./auth.service");
const dtos_1 = require("./dtos");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(body, res) {
        return await this.authService
            .validateUser(body)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result,
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: false,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async register(body, res) {
        return await this.authService
            .newUser(body)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result,
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: error.status,
                success: false,
                data: error.message,
            });
        });
    }
    async updatePass(res, body) {
        const { user } = res.req;
        return await this.authService
            .changePass(body, user)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result,
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: false,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async accountRecovery(res, body) {
        return await this.authService.recovery(body).then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result,
            });
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Login User" }),
    common_1.Post("login"),
    openapi.ApiResponse({ status: 201, type: require("./dtos/user-logged.dto").UserLoggedDto }),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update user's own password" }),
    common_1.Post("updatepass"),
    auth_decorator_1.default({
        possession: "own",
        action: "update",
        resource: app_roles_1.AppResource.USER,
    }),
    openapi.ApiResponse({ status: 201, type: require("./dtos/user-logged.dto").UserLoggedDto }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePass", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Password recovery" }),
    common_1.Post("recovery"),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.AccountRecoveryDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "accountRecovery", null);
AuthController = __decorate([
    swagger_1.ApiTags("Auth"),
    common_1.Controller("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map