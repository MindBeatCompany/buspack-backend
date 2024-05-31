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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const nest_access_control_1 = require("nest-access-control");
const path_1 = require("path");
const app_roles_1 = require("../../shared/config/app.roles");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const return_messages_1 = require("../../shared/return-messages");
const dtos_1 = require("./dtos");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, rolesBuilder) {
        this.userService = userService;
        this.rolesBuilder = rolesBuilder;
    }
    async getAllUser(res) {
        const { user } = res.req;
        if (user.roles === app_roles_1.AppRoles.ADMIN) {
            return await this.userService
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
        else {
            return await this.userService
                .findAll(user)
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
    }
    async getOneUser(id, res) {
        const { user } = res.req;
        if (this.rolesBuilder.can(user.roles).readAny(app_roles_1.AppResource.USER).granted) {
            return await this.userService
                .findOne(parseInt(id))
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
        else {
            return await this.userService
                .findOne(parseInt(id), user)
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
    }
    async updateTariff(accountId, res, file) {
        return await this.userService
            .updateTariff(file, accountId)
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
                data: error.response || error.message,
            });
        });
    }
    async passwordReset(res, body) {
        return await this.userService
            .userPasswordReset(body)
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
                data: error,
            });
        });
    }
    async updateUser(id, body, res) {
        const { user } = res.req;
        return await this.userService
            .update(parseInt(id), body, user)
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
                data: error.response || return_messages_1.default(error.message),
            });
        });
    }
    async updatePreferences(id, body, res) {
        const { user } = res.req;
        if (user.roles === app_roles_1.AppRoles.ADMIN) {
            return await this.userService
                .updateUserPreferences(parseInt(id), body)
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
        else {
            return await this.userService
                .updateUserPreferences(parseInt(id), body, user)
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
    }
    async setUserStatus(res, body) {
        const { user } = res.req;
        return await this.userService
            .setStatus(body, user)
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
    async getPreferences(id, res) {
        const { user } = res.req;
        if (user.roles === app_roles_1.AppRoles.ADMIN) {
            return await this.userService
                .getUserPreferences(parseInt(id))
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
        else {
            return await this.userService
                .getUserPreferences(parseInt(id), user)
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
    }
    async deleteUser(res, id) {
        const { user } = res.req;
        return await this.userService
            .delete(parseInt(id), user)
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
    async createMultiAcounts(res, bodyRaw, file) {
        const body = await this.userService.validateBody(bodyRaw);
        const response = await this.userService
            .createMultiAcounts(body, file)
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
                data: error.response || error.message,
            });
        });
        return response;
    }
    async createCorporateUsers(res, body) {
        return await this.userService
            .createCorporateUsers(body)
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
                data: error.response || error.message,
            });
        });
    }
    async downloadTariff(accountId, res) {
        return await this.userService.downloadFile(accountId)
            .then(async (result) => {
            return await res.sendFile(result.file, result);
        })
            .catch(async (error) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: false,
                data: return_messages_1.default(error.message),
            });
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Get all users" }),
    common_1.Get(),
    auth_decorator_1.default({
        possession: "any",
        action: "read",
        resource: app_roles_1.AppResource.USER,
    }),
    openapi.ApiResponse({ status: 200, type: [require("./dtos/user-created.dto").UserCreatedDto] }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    auth_decorator_1.default({
        possession: "own",
        action: "read",
        resource: app_roles_1.AppResource.USER,
    }),
    openapi.ApiResponse({ status: 200, type: require("./entities/user.entity").UserEntity }),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneUser", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update Tariff" }),
    common_1.Put("/tariff"),
    auth_decorator_1.default({ action: "update", possession: "any", resource: app_roles_1.AppResource.USER }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("file", { dest: path_1.join(__dirname, "../account/tarifarios") })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Query("accountid")),
    __param(1, common_1.Res()),
    __param(2, common_1.UploadedFile("file")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateTariff", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Password Reset" }),
    common_1.Put("/reset"),
    auth_decorator_1.default({ action: "update", possession: "any", resource: app_roles_1.AppResource.USER }),
    openapi.ApiResponse({ status: 200, type: [require("./dtos/createUser.dto").CreateUserDto] }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.PassResetDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "passwordReset", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update One User" }),
    common_1.Put("/:id"),
    auth_decorator_1.default({
        possession: "any",
        action: "update",
        resource: app_roles_1.AppResource.USER,
    }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/user-created.dto").UserCreatedDto }),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Update Preferences" }),
    common_1.Put("/:id/preferences"),
    auth_decorator_1.default({
        possession: "own",
        action: "update",
        resource: app_roles_1.AppResource.USER,
    }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/preferenceUser.dto").PreferenceUserDto }),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdatePreferenceDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePreferences", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Change Status" }),
    common_1.Post("/status"),
    auth_decorator_1.default({ possession: "any", action: "update", resource: app_roles_1.AppResource.USER }),
    openapi.ApiResponse({ status: 201, type: [require("./dtos/user-created.dto").UserCreatedDto] }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.UpdateStatusUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setUserStatus", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get Preferences" }),
    common_1.Get("/:id/preferences"),
    auth_decorator_1.default({
        possession: "own",
        action: "read",
        resource: app_roles_1.AppResource.USER,
    }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/preferenceUser.dto").PreferenceUserDto }),
    __param(0, common_1.Param("id")),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPreferences", null);
__decorate([
    auth_decorator_1.default({ action: "delete", possession: "own", resource: app_roles_1.AppResource.USER }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Res()), __param(1, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Create Multi Accounts" }),
    common_1.Post(),
    auth_decorator_1.default({ action: "create", possession: "any", resource: app_roles_1.AppResource.USER }),
    common_1.UseInterceptors(platform_express_1.FileInterceptor("file", { dest: path_1.join(__dirname, "../account/tarifarios") })),
    openapi.ApiResponse({ status: 201, type: require("./dtos/create-multi-user.dto").CreateMultiUserDto }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body("data")),
    __param(2, common_1.UploadedFile("file")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createMultiAcounts", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Create Corporate Users" }),
    common_1.Post("/corporate"),
    auth_decorator_1.default({
        action: "create",
        possession: "any",
        resource: app_roles_1.AppResource.USER
    }),
    openapi.ApiResponse({ status: 201, type: require("./dtos/create-multi-user.dto").CreateMultiUserDto }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createCorporateUsers", null);
__decorate([
    common_1.Get("/download/tariff"),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.USER,
    }),
    common_1.Header("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, common_1.Query("accountid")), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "downloadTariff", null);
UserController = __decorate([
    swagger_1.ApiTags("User"),
    common_1.Controller("users"),
    __param(1, nest_access_control_1.InjectRolesBuilder()),
    __metadata("design:paramtypes", [user_service_1.UserService,
        nest_access_control_1.RolesBuilder])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map