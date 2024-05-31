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
exports.PricingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_minimal_accounts_response_dto_1 = require("./dtos/response/get-minimal-accounts-response.dto");
const update_prices_dto_1 = require("./dtos/request/update-prices.dto");
const pricing_service_1 = require("./pricing.service");
const create_pricing_dto_1 = require("./dtos/request/create-pricing.dto");
const get_minimal_localities_response_dto_1 = require("./dtos/response/get-minimal-localities-response.dto");
const get_pricing_to_clone_dto_1 = require("./dtos/response/get-pricing-to-clone.dto");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const app_roles_1 = require("../../shared/config/app.roles");
let PricingController = class PricingController {
    constructor(pricingService) {
        this.pricingService = pricingService;
    }
    async createPricingTable(res, body) {
        return this.pricingService.create(body)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error.message
            });
        });
    }
    async getAccountCurrentPricing(accountId, res) {
        return this.pricingService.getPricingFrom(accountId)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error,
                message: error.message
            });
        });
    }
    async getInfoToClone(accountId, res) {
        return this.pricingService.getPricingToClone(accountId)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error,
                message: error.message
            });
        });
    }
    async getAllAccounts(res) {
        return this.pricingService.getAccountsWithPricing()
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error,
                message: error.message
            });
        });
    }
    async getAllLocalities(res) {
        return this.pricingService.getAllLocalities()
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error,
                message: error.message
            });
        });
    }
    async updatePricingTable(body, accountId, res) {
        return this.pricingService.updatePricingTableFrom(accountId, body)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result
            });
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error.message
            });
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Create a pricing to selected account" }),
    common_1.Post(),
    auth_decorator_1.default({
        action: "create",
        possession: "own",
        resource: app_roles_1.AppResource.PRICING,
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_pricing_dto_1.CreatePricingDto]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "createPricingTable", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get account current pricing full data" }),
    common_1.Get("/accounts/:accountId/current"),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.PRICING,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param("accountId")),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getAccountCurrentPricing", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Obtains all pricing data to clone" }),
    swagger_1.ApiOkResponse({
        type: get_pricing_to_clone_dto_1.PricingToCloneDto,
        isArray: true
    }),
    common_1.Get("/accounts/:accountId"),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.PRICING,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Param("accountId")),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getInfoToClone", null);
__decorate([
    common_1.Get("/accounts"),
    swagger_1.ApiOperation({ summary: "Get all accounts with a current pricing" }),
    swagger_1.ApiOkResponse({
        type: get_minimal_accounts_response_dto_1.MinimalAccountDto,
        isArray: true
    }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.PRICING,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getAllAccounts", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get all localities with zip code, locality name and province name" }),
    common_1.Get("/localities"),
    swagger_1.ApiOkResponse({
        type: get_minimal_localities_response_dto_1.MinimalLocalityDto,
        isArray: true
    }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.PRICING,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getAllLocalities", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update by percentage or fixed amount account's current pricing table" }),
    common_1.Put("/accounts/:accountId"),
    auth_decorator_1.default({
        action: "update",
        possession: "own",
        resource: app_roles_1.AppResource.PRICING,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Body()),
    __param(1, common_1.Param("accountId")),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_prices_dto_1.UpdatePricesDto, Number, Object]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "updatePricingTable", null);
PricingController = __decorate([
    swagger_1.ApiTags("Pricings"),
    common_1.Controller('pricings'),
    __metadata("design:paramtypes", [pricing_service_1.PricingService])
], PricingController);
exports.PricingController = PricingController;
//# sourceMappingURL=pricing.controller.js.map