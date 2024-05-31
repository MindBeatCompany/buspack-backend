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
exports.AppmenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_operations_interface_1 = require("../../shared/interfaces/crud-operations.interface");
const typeorm_2 = require("typeorm");
const appmenu_entity_1 = require("./entities/appmenu.entity");
const role_entity_1 = require("../role/entities/role.entity");
let AppmenuService = class AppmenuService {
    constructor(appmenuRepository, rolRepository) {
        this.appmenuRepository = appmenuRepository;
        this.rolRepository = rolRepository;
    }
    async findAll(role) {
        if (role) {
            const rol = await this.rolRepository.findOne({ name: role });
            const menues = await this.appmenuRepository
                .createQueryBuilder('appmenu')
                .leftJoinAndSelect('appmenu.roles', 'roles', 'roles.id=:idRol', {
                idRol: rol.id,
            })
                .where('roles.id=:idRol', { idRol: rol.id })
                .orderBy('appmenu.id', 'ASC')
                .getMany();
            if (!menues.length)
                throw new common_1.NotFoundException('There are no menus for this role');
            return menues;
        }
        else {
            const menues = await this.appmenuRepository.find({
                relations: ['menuParent', 'roles'],
                order: { id: 'ASC' },
            });
            if (!menues.length)
                throw new common_1.NotFoundException('There are no menus for this role');
            return menues;
        }
    }
    findById(id) {
        throw new Error('Method not implemented.');
    }
    findOne(options, options2) {
        throw new Error('Method not implemented.');
    }
    async create(menu, options) {
        const roles = await this.rolRepository.find({
            where: { name: typeorm_2.In(menu.roles) },
        });
        const menuParent = await this.appmenuRepository.findOne({
            name: menu.menuParent.toUpperCase(),
        });
        const newMenu = this.appmenuRepository.create({
            name: menu.name,
            menuParent: menuParent,
            url: menu.url,
            roles: roles,
        });
        try {
            await this.appmenuRepository.save(newMenu);
        }
        catch (error) {
            throw new common_1.HttpException(`Error`, common_1.HttpStatus.BAD_REQUEST);
        }
        return newMenu;
    }
    update(id, newValue) {
        throw new Error('Method not implemented.');
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
};
AppmenuService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(appmenu_entity_1.AppmenuEntity)),
    __param(1, typeorm_1.InjectRepository(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AppmenuService);
exports.AppmenuService = AppmenuService;
//# sourceMappingURL=appmenu.service.js.map