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
exports.EnabledPlaceEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let EnabledPlaceEntity = class EnabledPlaceEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, idog: { required: true, type: () => String }, isActive: { required: true, type: () => String }, code: { required: true, type: () => String }, place_name: { required: true, type: () => String }, type_description: { required: true, type: () => String }, locality_name: { required: true, type: () => String }, province_name: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EnabledPlaceEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "idog", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EnabledPlaceEntity.prototype, "idog", void 0);
__decorate([
    typeorm_1.Column({ name: "isActive", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EnabledPlaceEntity.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({ name: "code", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EnabledPlaceEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ name: "place_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EnabledPlaceEntity.prototype, "place_name", void 0);
__decorate([
    typeorm_1.Column({ name: "type_description", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EnabledPlaceEntity.prototype, "type_description", void 0);
__decorate([
    typeorm_1.Column({ name: "locality_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EnabledPlaceEntity.prototype, "locality_name", void 0);
__decorate([
    typeorm_1.Column({ name: "province_name", type: "varchar", length: 255 }),
    __metadata("design:type", String)
], EnabledPlaceEntity.prototype, "province_name", void 0);
EnabledPlaceEntity = __decorate([
    typeorm_1.Entity("enabled_places")
], EnabledPlaceEntity);
exports.EnabledPlaceEntity = EnabledPlaceEntity;
//# sourceMappingURL=enabled-places.entity.js.map