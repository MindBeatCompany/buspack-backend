"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppmenuModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const role_entity_1 = require("../role/entities/role.entity");
const appmenu_controller_1 = require("./appmenu.controller");
const appmenu_service_1 = require("./appmenu.service");
const appmenu_entity_1 = require("./entities/appmenu.entity");
let AppmenuModule = class AppmenuModule {
};
AppmenuModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([appmenu_entity_1.AppmenuEntity, role_entity_1.RoleEntity])],
        controllers: [appmenu_controller_1.AppmenuController],
        providers: [appmenu_service_1.AppmenuService],
    })
], AppmenuModule);
exports.AppmenuModule = AppmenuModule;
//# sourceMappingURL=appmenu.module.js.map