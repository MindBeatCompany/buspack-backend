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
exports.AccountController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_roles_1 = require("../../shared/config/app.roles");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const return_messages_1 = require("../../shared/return-messages");
const account_service_1 = require("./account.service");
const dtos_1 = require("./dtos");
const chage_has_custom_pricing_field_1 = require("./dtos/chage-has-custom-pricing-field");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    async deactivateAccounts(res, body) {
        return await this.accountService
            .deactivate(body)
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
    async getAll(res) {
        return await this.accountService
            .findAll()
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
    async getAllUsers(res, id) {
        return await this.accountService
            .getUsers(parseInt(id))
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
    async update(res, id, body) {
        return await this.accountService
            .update(parseInt(id), body)
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
                success: true,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async changeHasCustomPricing(res, id, body) {
        return await this.accountService
            .changeHasCustomPricing(parseInt(id), body.hasCustom)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result,
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.BAD_REQUEST).json({
                status: common_1.HttpStatus.BAD_REQUEST,
                success: true,
                data: return_messages_1.default(error.message),
            });
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Deactivate selected accounts" }),
    common_1.Put("/deactivate"),
    auth_decorator_1.default({
        possession: "any",
        action: "update",
        resource: app_roles_1.AppResource.ACCOUNT,
    }),
    openapi.ApiResponse({ status: 200, type: [require("./dtos/account-created.dto").AccountCreatedDto] }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.DeactivateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "deactivateAccounts", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get all accounts" }),
    common_1.Get(),
    auth_decorator_1.default({ possession: "any", action: "read", resource: app_roles_1.AppResource.ACCOUNT }),
    openapi.ApiResponse({ status: 200, type: [require("./dtos/account-created.dto").AccountCreatedDto] }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAll", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get all Users on account" }),
    common_1.Get("/:id/users"),
    auth_decorator_1.default({ possession: "any", action: "read", resource: app_roles_1.AppResource.ACCOUNT }),
    openapi.ApiResponse({ status: 200, type: [require("../user/dtos/user-created.dto").UserCreatedDto] }),
    __param(0, common_1.Res()),
    __param(1, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "getAllUsers", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update Company Name" }),
    common_1.Put("/:id"),
    auth_decorator_1.default({ possession: "any", action: "update", resource: app_roles_1.AppResource.ACCOUNT }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/account-created.dto").AccountCreatedDto }),
    __param(0, common_1.Res()),
    __param(1, common_1.Param("id")),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, dtos_1.UpdateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "update", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Modify an account has a custom pricing field" }),
    swagger_1.ApiParam({
        name: 'id',
        required: true,
        example: 1
    }),
    common_1.Put("/:id/pricings"),
    auth_decorator_1.default({
        possession: "any",
        action: "update",
        resource: app_roles_1.AppResource.ACCOUNT,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Param("id")),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, chage_has_custom_pricing_field_1.ChangeHasCustomPricingFieldRequest]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "changeHasCustomPricing", null);
AccountController = __decorate([
    swagger_1.ApiTags("Accounts"),
    common_1.Controller("account"),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map