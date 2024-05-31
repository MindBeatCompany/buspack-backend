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
exports.LocalityEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let LocalityEntity = class LocalityEntity {
    isEq(enabledPlace) {
        return this.enabled_place === enabledPlace.place_name && this.locality_name === enabledPlace.locality_name &&
            this.province_name === enabledPlace.province_name;
    }
    static _OPENAPI_METADATA_FACTORY() {
        return { idlocality: { required: true, type: () => Number }, zip_code: { required: true, type: () => Number }, province_name: { required: true, type: () => String }, locality_name: { required: true, type: () => String }, enabled_place: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "idlocality", type: 'int' }),
    __metadata("design:type", Number)
], LocalityEntity.prototype, "idlocality", void 0);
__decorate([
    typeorm_1.Column({ name: "zip_code", type: "int" }),
    __metadata("design:type", Number)
], LocalityEntity.prototype, "zip_code", void 0);
__decorate([
    typeorm_1.Column({ name: "province_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], LocalityEntity.prototype, "province_name", void 0);
__decorate([
    typeorm_1.Column({ name: "locality_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], LocalityEntity.prototype, "locality_name", void 0);
__decorate([
    typeorm_1.Column({ name: "enabled_place", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], LocalityEntity.prototype, "enabled_place", void 0);
__decorate([
    typeorm_1.Column({ type: "bool", default: true, select: false }),
    __metadata("design:type", Boolean)
], LocalityEntity.prototype, "isActive", void 0);
LocalityEntity = __decorate([
    typeorm_1.Entity("locality")
], LocalityEntity);
exports.LocalityEntity = LocalityEntity;
//# sourceMappingURL=location.entity.js.map