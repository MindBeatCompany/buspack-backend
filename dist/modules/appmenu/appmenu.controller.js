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
exports.AppmenuController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const nest_access_control_1 = require("nest-access-control");
const app_roles_1 = require("../../shared/config/app.roles");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const appmenu_service_1 = require("./appmenu.service");
let AppmenuController = class AppmenuController {
    constructor(appmenuService, rolesBuilder) {
        this.appmenuService = appmenuService;
        this.rolesBuilder = rolesBuilder;
    }
};
AppmenuController = __decorate([
    common_1.Controller("appmenu"),
    __param(1, nest_access_control_1.InjectRolesBuilder()),
    __metadata("design:paramtypes", [appmenu_service_1.AppmenuService,
        nest_access_control_1.RolesBuilder])
], AppmenuController);
exports.AppmenuController = AppmenuController;
//# sourceMappingURL=appmenu.controller.js.map