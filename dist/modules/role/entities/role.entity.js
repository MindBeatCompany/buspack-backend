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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEntity = void 0;
const openapi = require("@nestjs/swagger");
const appmenu_entity_1 = require("../../appmenu/entities/appmenu.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let RoleEntity = class RoleEntity {
    setUpperCase() {
        this.name = this.name.toUpperCase();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, users: { required: true, type: () => [require("../../user/entities/user.entity").UserEntity] }, appmenues: { required: true, type: () => [require("../../appmenu/entities/appmenu.entity").AppmenuEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.UserEntity, (users) => users.role),
    __metadata("design:type", Array)
], RoleEntity.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToMany(() => appmenu_entity_1.AppmenuEntity, (appmenu) => appmenu.roles),
    __metadata("design:type", Array)
], RoleEntity.prototype, "appmenues", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RoleEntity.prototype, "setUpperCase", null);
RoleEntity = __decorate([
    typeorm_1.Entity('roles')
], RoleEntity);
exports.RoleEntity = RoleEntity;
//# sourceMappingURL=role.entity.js.map