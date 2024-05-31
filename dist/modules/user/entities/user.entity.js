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
exports.UserEntity = void 0;
const openapi = require("@nestjs/swagger");
const bcrypt_1 = require("bcrypt");
const account_entity_1 = require("../../account/entities/account.entity");
const role_entity_1 = require("../../role/entities/role.entity");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
    async hashPassword() {
        console.log("JOJOJOJOJOJOJOJOJOJO");
        if (!this.password) {
            return;
        }
        this.password = await bcrypt_1.hash(this.password, 12);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, userName: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, firstTimeLogged: { required: true, type: () => Boolean }, wrongSessionCounter: { required: true, type: () => Number }, sessionTime: { required: true, type: () => Number }, role: { required: true, type: () => require("../../role/entities/role.entity").RoleEntity }, account: { required: true, type: () => require("../../account/entities/account.entity").AccountEntity }, createdAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "user_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], UserEntity.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({ name: "name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ name: "last_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 128, nullable: false, select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "bool", default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({
        name: "first_time_logged",
        type: "bool",
        default: true,
        select: false,
    }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "firstTimeLogged", void 0);
__decorate([
    typeorm_1.Column({
        name: "wrong_session_counter",
        type: "smallint",
        default: 4,
        select: false,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "wrongSessionCounter", void 0);
__decorate([
    typeorm_1.Column({ name: "session_time", type: "smallint", default: 10 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "sessionTime", void 0);
__decorate([
    typeorm_1.ManyToOne(() => role_entity_1.RoleEntity, (role) => role.id),
    __metadata("design:type", role_entity_1.RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToOne(() => account_entity_1.AccountEntity, (account) => account.users),
    __metadata("design:type", account_entity_1.AccountEntity)
], UserEntity.prototype, "account", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: "deleted_at", type: "timestamp" }),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
UserEntity = __decorate([
    typeorm_1.Entity("users")
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map