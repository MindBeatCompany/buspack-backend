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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_roles_1 = require("../../shared/config/app.roles");
const strings_constants_1 = require("../../shared/config/strings-constants");
const crud_operations_interface_1 = require("../../shared/interfaces/crud-operations.interface");
const return_messages_1 = require("../../shared/return-messages");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async findAll(user) {
        if (user.roles === app_roles_1.AppRoles.ADMIN) {
            const roles = await this.roleRepository.find();
            if (!roles.length)
                throw new Error(strings_constants_1.default.notFoundRoles);
            return roles;
        }
        else {
            const roles = await this.roleRepository.find({
                where: `name != "${app_roles_1.AppRoles.ADMIN}"`,
            });
            if (!roles.length)
                throw new Error(strings_constants_1.default.notFoundRoles);
            return roles;
        }
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    async findOne(options, options2) {
        const role = await this.roleRepository.findOne(options);
        if (!role)
            throw new Error(strings_constants_1.default.rolNotExist);
        return role;
    }
    async create(entity, options) {
        const role = await this.roleRepository.findOne(entity);
        if (role)
            throw new Error(strings_constants_1.default.rolExist);
        const newRol = this.roleRepository.create(entity);
        return await this.roleRepository.save(newRol);
    }
    async update(id, newValue) {
        const role = await this.findOne({ id });
        if (!role)
            throw new Error(strings_constants_1.default.rolNotExist);
        const roleUpdated = Object.assign(role, newValue);
        return await this.roleRepository.save(roleUpdated);
    }
    async delete(id) {
        const role = await this.roleRepository.findOne({ id });
        if (!role)
            return return_messages_1.default(strings_constants_1.default.rolNotExist);
        return await this.roleRepository.remove(role);
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map