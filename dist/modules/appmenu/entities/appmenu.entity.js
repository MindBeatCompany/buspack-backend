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
var AppmenuEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppmenuEntity = void 0;
const openapi = require("@nestjs/swagger");
const role_entity_1 = require("../../role/entities/role.entity");
const typeorm_1 = require("typeorm");
let AppmenuEntity = AppmenuEntity_1 = class AppmenuEntity {
    setUpperCase() {
        this.name = this.name.toUpperCase();
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, name: { required: true, type: () => String }, menuParent: { required: true, type: () => require("./appmenu.entity").AppmenuEntity }, url: { required: true, type: () => String }, roles: { required: true, type: () => [require("../../role/entities/role.entity").RoleEntity] } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AppmenuEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AppmenuEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => AppmenuEntity_1, (menu) => menu.id),
    __metadata("design:type", AppmenuEntity)
], AppmenuEntity.prototype, "menuParent", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false, length: 255 }),
    __metadata("design:type", String)
], AppmenuEntity.prototype, "url", void 0);
__decorate([
    typeorm_1.ManyToMany(() => role_entity_1.RoleEntity, (role) => role),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], AppmenuEntity.prototype, "roles", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppmenuEntity.prototype, "setUpperCase", null);
AppmenuEntity = AppmenuEntity_1 = __decorate([
    typeorm_1.Entity('appmenues')
], AppmenuEntity);
exports.AppmenuEntity = AppmenuEntity;
//# sourceMappingURL=appmenu.entity.js.map