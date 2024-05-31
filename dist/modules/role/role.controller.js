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
exports.RoleController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_roles_1 = require("../../shared/config/app.roles");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const return_messages_1 = require("../../shared/return-messages");
const dtos_1 = require("./dtos");
const role_service_1 = require("./role.service");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async getAllRoles(res) {
        const { user } = res.req;
        return await this.roleService
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
                success: true,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async getOneRole(res, id) {
        return await this.roleService
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
                success: true,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async createRole(res, body) {
        return await this.roleService
            .create(body)
            .then(async (result) => {
            return await res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result,
            });
        })
            .catch((error) => {
            console.log(error.message);
            throw new common_1.NotAcceptableException(error.message);
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Get all roles" }),
    common_1.Get(),
    auth_decorator_1.default({ possession: "own", action: "read", resource: app_roles_1.AppResource.ROLE }),
    openapi.ApiResponse({ status: 200, type: [require("./dtos/role-created.dto").RoleCreatedDto] }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getAllRoles", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get One role" }),
    common_1.Get("/:id"),
    auth_decorator_1.default({ possession: "own", action: "read", resource: app_roles_1.AppResource.ROLE }),
    openapi.ApiResponse({ status: 200, type: require("./dtos/role-created.dto").RoleCreatedDto }),
    __param(0, common_1.Res()),
    __param(1, common_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getOneRole", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Create One role" }),
    common_1.Post(),
    auth_decorator_1.default({ possession: "any", action: "create", resource: app_roles_1.AppResource.ROLE }),
    openapi.ApiResponse({ status: 201, type: require("./entities/role.entity").RoleEntity }),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.CreateRolDto]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "createRole", null);
RoleController = __decorate([
    swagger_1.ApiTags("Roles"),
    common_1.Controller("role"),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map