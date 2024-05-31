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
exports.ZonesEntity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let ZonesEntity = class ZonesEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, zone: { required: true, type: () => String }, cp: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "id", type: 'int' }),
    __metadata("design:type", Number)
], ZonesEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "zone", type: "varchar", length: 15 }),
    __metadata("design:type", String)
], ZonesEntity.prototype, "zone", void 0);
__decorate([
    typeorm_1.Column({ name: "cp", type: "varchar", length: 8 }),
    __metadata("design:type", String)
], ZonesEntity.prototype, "cp", void 0);
ZonesEntity = __decorate([
    typeorm_1.Entity("zones_cp")
], ZonesEntity);
exports.ZonesEntity = ZonesEntity;
//# sourceMappingURL=zonescp.entity.js.map