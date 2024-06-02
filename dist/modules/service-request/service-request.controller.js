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
exports.ServiceRequestController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const app_roles_1 = require("../../shared/config/app.roles");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const return_messages_1 = require("../../shared/return-messages");
const service_request_service_1 = require("./service-request.service");
const create_format_service_request_dto_1 = require("./dtos/format-service-request/create-format-service-request.dto");
const path_1 = require("path");
const update_format_service_request_dto_1 = require("./dtos/format-service-request/update-format-service-request.dto");
const multer_1 = require("multer");
let ServiceRequestController = class ServiceRequestController {
    constructor(serviceServRequest) {
        this.serviceServRequest = serviceServRequest;
    }
    async getAllServiceRequest(res) {
        return this.serviceServRequest.getAll()
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
                data: error
            });
        });
    }
    async getByRequestIdVoucherAndDelivery(requestId, voucher, delivery, dateFrom, dateTo, res) {
        const { user } = res.req;
        const { account } = user;
        return this.serviceServRequest.getByRequestIdVoucherAndDelivery(requestId, voucher, delivery, account, dateFrom, dateTo)
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
                data: error
            });
        });
    }
    async getByQuery(requestId, voucher, delivery, fromDate, toDate, res) {
        const { user } = res.req;
        const { account } = user;
        return this.serviceServRequest.getByQuery(requestId, voucher, delivery, fromDate, toDate, account)
            .then(async (result) => {
            this.serviceServRequest.updateRequestsBetweenDates(fromDate, toDate, account);
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result
            });
        })
            .catch(async (error) => {
            console.error(error);
            return await res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error
            });
        });
    }
    async uploadServiceRequest(res, file, isStandardFormat) {
        const { user } = res.req;
        const { account } = user;
        const isStandard = isStandardFormat === "true";
        return this.serviceServRequest
            .uploadFile(file, account, isStandard)
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
    downloadTemplateFile(res) {
        return this.serviceServRequest
            .downloadFile()
            .then((result) => {
            res.setHeader('Content-disposition', 'attachment; filename=template.xls');
            res.end(result, 'base64');
        })
            .catch((error) => {
            res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: false,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async createRequest(res, body, isStandardFormat) {
        const { user } = res.req;
        const { account } = user;
        return await this.serviceServRequest
            .createRequest(body, account, isStandardFormat)
            .then(async (result) => {
            if (result.created) {
                return await res.status(common_1.HttpStatus.CREATED).json({
                    status: common_1.HttpStatus.CREATED,
                    success: true,
                    data: result.data,
                });
            }
            else {
                return await res.status(common_1.HttpStatus.OK).json({
                    status: common_1.HttpStatus.OK,
                    success: false,
                    data: result.data,
                });
            }
        })
            .catch(async (error) => {
            console.log("catch error: ", JSON.stringify(error));
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: false,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async createFormatServiceRequest(res, body) {
        return await this.serviceServRequest
            .createFormatServiceRequest(body)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.CREATED).json({
                success: true
            });
        })
            .catch(async (error) => {
            return res.status(common_1.HttpStatus.OK).json({
                success: false,
                data: return_messages_1.default(error.message)
            });
        });
    }
    async getFormatServiceRequest(res, accountId) {
        return this.serviceServRequest
            .getFormatServiceRequest(accountId)
            .then(async (result) => {
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                data: result
            });
        })
            .catch(err => {
            const errorClassname = err.constructor.name;
            const data = errorClassname === 'HttpException' ? err.response.error : return_messages_1.default(err.message);
            const status = errorClassname === "HttpException" ? err.status : common_1.HttpStatus.OK;
            return res.status(status).json({
                success: false,
                data: data
            });
        });
    }
    async updateFormatServiceRequest(res, body) {
        return this.serviceServRequest
            .updateFormatServiceRequest(body)
            .then(result => {
            return res.status(common_1.HttpStatus.OK).json({
                success: true
            });
        })
            .catch(err => {
            const errorClassname = err.constructor.name;
            const data = errorClassname === 'HttpException' ? err.response.error : return_messages_1.default(err.message);
            const status = errorClassname === "HttpException" ? err.status : common_1.HttpStatus.OK;
            return res.status(status).json({
                success: false,
                data: data
            });
        });
    }
    getFormatLocalitiesXls(res, accountId) {
        return this.serviceServRequest.getFormatLocalitiesXlsAccount(accountId)
            .then(xlsFile => {
            return res.download(xlsFile);
        })
            .catch(err => {
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: false,
                data: return_messages_1.default(err.message),
            });
        });
    }
    async uploadFormatLocalitiesXls(res, accountId, file) {
        return this.serviceServRequest.uploadFormatLocalitiesXls(accountId, file)
            .then(() => {
            return res.status(common_1.HttpStatus.OK).json({
                success: true
            });
        })
            .catch(err => {
            const errorClassname = err.constructor.name;
            return res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: false,
                data: errorClassname === 'HttpException' ? err.response.error : return_messages_1.default(err.message)
            });
        });
    }
    getFormatLocalitiesXlsAccount(res, accountId) {
        return this.serviceServRequest.getLocalitiesByAccountId(accountId)
            .then(result => {
            return res.status(common_1.HttpStatus.OK).json(result);
        }).catch(err => {
            return res.json({
                success: false,
                data: return_messages_1.default(err.message)
            });
        });
    }
    updateFormatLocalitiesXlsAccount(res, accountId, file) {
        return this.serviceServRequest.updateFormatLocalitiesXlsAccount(accountId, file)
            .then(() => {
            return res.json({
                success: true
            });
        })
            .catch(err => {
            return res.json({
                success: false,
                data: return_messages_1.default(err.message)
            });
        });
    }
};
__decorate([
    common_1.Get(),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "getAllServiceRequest", null);
__decorate([
    common_1.Get('print-label'),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Query('request-id')),
    __param(1, common_1.Query('voucher')),
    __param(2, common_1.Query('delivery')),
    __param(3, common_1.Query('dateFrom')),
    __param(4, common_1.Query('dateTo')),
    __param(5, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "getByRequestIdVoucherAndDelivery", null);
__decorate([
    common_1.Get('query'),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Query('request-id')),
    __param(1, common_1.Query('voucher')),
    __param(2, common_1.Query('delivery')),
    __param(3, common_1.Query('fromDate')),
    __param(4, common_1.Query('toDate')),
    __param(5, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "getByQuery", null);
__decorate([
    common_1.Post("/upload"),
    auth_decorator_1.default({
        action: "create",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("file", {
        storage: multer_1.diskStorage({
            destination: __dirname + "/sr-files",
            filename: (req, file, callback) => {
                const filename = Date.now() + "_" + file.originalname;
                callback(null, filename);
            }
        })
    })),
    openapi.ApiResponse({ status: 201, type: require("./entities/service-request.entity").ServiceRequestEntity }),
    __param(0, common_1.Res()),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Query('is-standard-format')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "uploadServiceRequest", null);
__decorate([
    common_1.Get("/download/planilla"),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.Header("Content-type", "application/vnd.ms-excel"),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "downloadTemplateFile", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Create" }),
    common_1.Post("/create"),
    auth_decorator_1.default({
        action: "create",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Query('is-standard-format')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, String]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "createRequest", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Create format request service for accounts" }),
    auth_decorator_1.default({
        action: "create",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.Post('format-request'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_format_service_request_dto_1.CreateFormatServiceRequestDto]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "createFormatServiceRequest", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get format request service for an account" }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.Get("format-request"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "getFormatServiceRequest", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update format request service for accounts" }),
    auth_decorator_1.default({
        action: "update",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.Put("format-request"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_format_service_request_dto_1.default]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "updateFormatServiceRequest", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get xls to format localities" }),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.Get("/xls-format-localities/download"),
    common_1.Header("Content-Type", "application/vnd.ms-excel"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Query("accountId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "getFormatLocalitiesXls", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Upload format localities xls " }),
    auth_decorator_1.default({
        action: "create",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.Post("/xls-format-localities/upload"),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("formatLocalitiesXls", { dest: path_1.join(__dirname, "tmp") })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Query("accountId")),
    __param(2, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], ServiceRequestController.prototype, "uploadFormatLocalitiesXls", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get xls format localities uploaded by an user with with admin role" }),
    common_1.Get("/xls-format-localities"),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.Header("Content-Type", "application/json"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Query("accountId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "getFormatLocalitiesXlsAccount", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update xls format localities uploaded by an user with with admin role" }),
    auth_decorator_1.default({
        action: "update",
        possession: "own",
        resource: app_roles_1.AppResource.SERVICE_REQUEST,
    }),
    common_1.Put("/xls-format-localities"),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("formatLocalitiesXls", { dest: path_1.join(__dirname, "tmp") })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()),
    __param(1, common_1.Query("accountId")),
    __param(2, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", void 0)
], ServiceRequestController.prototype, "updateFormatLocalitiesXlsAccount", null);
ServiceRequestController = __decorate([
    swagger_1.ApiTags("Service Request"),
    common_1.Controller("service-request"),
    __metadata("design:paramtypes", [service_request_service_1.ServiceRequestService])
], ServiceRequestController);
exports.ServiceRequestController = ServiceRequestController;
//# sourceMappingURL=service-request.controller.js.map