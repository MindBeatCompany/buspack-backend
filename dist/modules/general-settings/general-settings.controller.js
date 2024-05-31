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
exports.GeneralSettingsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_roles_1 = require("../../shared/config/app.roles");
const strings_constants_1 = require("../../shared/config/strings-constants");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const create_general_settings_dto_1 = require("./dtos/create-general-settings.dto");
const update_general_settings_dto_1 = require("./dtos/update-general-settings.dto");
const general_settings_service_1 = require("./general-settings.service");
let GeneralSettingsController = class GeneralSettingsController {
    constructor(generalSettingsService) {
        this.generalSettingsService = generalSettingsService;
    }
    async getSettings(res) {
        try {
            const settings = await this.generalSettingsService.findById();
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: settings,
            });
        }
        catch (error) {
            return await res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error,
                message: strings_constants_1.default.generalSettingsError,
                error: error,
            });
        }
    }
    async createSettings(res, body) {
        try {
            const settings = await this.generalSettingsService.create(body);
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: settings,
            });
        }
        catch (error) {
            return await res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error,
                message: strings_constants_1.default.generalSettingsError,
                error: error,
            });
        }
    }
    async uploadSettings(res, body) {
        try {
            const settings = await this.generalSettingsService.update(body);
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: settings,
            });
        }
        catch (error) {
            return await res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: error,
                message: strings_constants_1.default.generalSettingsError,
                error: error,
            });
        }
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Get settings" }),
    common_1.Get(),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.SETTINGS,
    }),
    openapi.ApiResponse({ status: 200, type: require("./entities/general-settings.entity").GeneralSettingsEntity }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralSettingsController.prototype, "getSettings", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Create settings" }),
    auth_decorator_1.default({
        action: "create",
        possession: "own",
        resource: app_roles_1.AppResource.SETTINGS,
    }),
    common_1.Post(),
    openapi.ApiResponse({ status: 201, type: require("./entities/general-settings.entity").GeneralSettingsEntity }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_general_settings_dto_1.CreateGeneralSettingsDTO]),
    __metadata("design:returntype", Promise)
], GeneralSettingsController.prototype, "createSettings", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update settings" }),
    common_1.Put(),
    auth_decorator_1.default({
        action: "update",
        possession: "own",
        resource: app_roles_1.AppResource.SETTINGS,
    }),
    openapi.ApiResponse({ status: 200, type: require("./entities/general-settings.entity").GeneralSettingsEntity }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_general_settings_dto_1.UpdateGeneralSettingsDTO]),
    __metadata("design:returntype", Promise)
], GeneralSettingsController.prototype, "uploadSettings", null);
GeneralSettingsController = __decorate([
    common_1.Controller("general-settings"),
    __metadata("design:paramtypes", [general_settings_service_1.GeneralSettingsService])
], GeneralSettingsController);
exports.GeneralSettingsController = GeneralSettingsController;
//# sourceMappingURL=general-settings.controller.js.map