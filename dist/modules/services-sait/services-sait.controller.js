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
exports.ServicesSaitController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_roles_1 = require("../../shared/config/app.roles");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const return_messages_1 = require("../../shared/return-messages");
const services_sait_service_1 = require("./services-sait.service");
const platform_express_1 = require("@nestjs/platform-express");
const account_service_1 = require("../account/account.service");
let ServicesSaitController = class ServicesSaitController {
    constructor(service, acountService) {
        this.service = service;
        this.acountService = acountService;
    }
    async saitAccessToken(res) {
        return await this.service.saitAccessToken()
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
                data: {
                    message: error.errors
                }
            });
        });
    }
    async uploadFile(file, req, res) {
        return await this.service.saitFileUpload(file.path, req.body.token)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result
            });
        })
            .catch(async (error) => {
            console.log("error");
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: {
                    message: error.errors
                }
            });
        });
    }
    async saitValidate(req, res) {
        return await this.service.saitValidate(req.body.idarchivo, req.body.token)
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
                data: {
                    message: error.errors
                }
            });
        });
    }
    async saiValidationResult(req, res) {
        return await this.service.saitValidationResult(req.body.idarchivo, req.body.token)
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
                data: return_messages_1.default(error.message)
            });
        });
    }
    async saitProcess(req, res) {
        return await this.service.saitProcess(req.body.idarchivo, req.body.token)
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
                data: return_messages_1.default(error.message)
            });
        });
    }
    async saitProcessResult(req, res) {
        return await this.service.saitProcessResult(req.body.idarchivo, req.body.token)
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
                data: return_messages_1.default(error.message)
            });
        });
    }
    async saitStatus(req, res) {
        return await this.service.saitStatus(req.body.idarchivo, req.body.token)
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
                data: return_messages_1.default(error.message)
            });
        });
    }
    async saitStatusDelivery(req, res) {
        return await this.service.saitDeliveryStatus(req.body.numero, req.body.token)
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
                data: return_messages_1.default(error.message)
            });
        });
    }
    async getCustomerByCuil(code, req, res) {
        const token = await this.service.saitAccessToken();
        return await this.service.getCustomerAccountByCuil(code, token.token)
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
                data: return_messages_1.default(error.message)
            });
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Get token SAIT" }),
    common_1.Get('/token'),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "saitAccessToken", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Upload file to SAIT" }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES,
    }),
    common_1.Post('/upload'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', { dest: __dirname + "/tmp" })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.UploadedFile()), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "uploadFile", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Validate the provided file and transform it for processing" }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES,
    }),
    common_1.Post('/validate'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "saitValidate", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Returns the result of the last process carried out to the records of the file (validate / process)" }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES,
    }),
    common_1.Post('/validation-result'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "saiValidationResult", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Starts the import process of the provided file." }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES,
    }),
    common_1.Post('/process'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "saitProcess", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Returns the result of the last process carried out to the records of the file (validate / process)" }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES,
    }),
    common_1.Post('/process-result'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "saitProcessResult", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Returns the status of the import process of the provided file." }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES,
    }),
    common_1.Post('/status'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "saitStatus", null);
__decorate([
    swagger_1.ApiOperation({
        summary: "Obtains a delivery status, through the external code, the receipt number or the delivery number."
    }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES,
    }),
    common_1.Post('/status-delivery'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "saitStatusDelivery", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get customer information by a code or a cuil." }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SAIT_SERVICES
    }),
    common_1.Get('/cuit'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Query('code')), __param(1, common_1.Req()), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesSaitController.prototype, "getCustomerByCuil", null);
ServicesSaitController = __decorate([
    swagger_1.ApiTags("Services Sait"),
    common_1.Controller('services-sait'),
    __metadata("design:paramtypes", [services_sait_service_1.ServicesSaitService, account_service_1.AccountService])
], ServicesSaitController);
exports.ServicesSaitController = ServicesSaitController;
//# sourceMappingURL=services-sait.controller.js.map