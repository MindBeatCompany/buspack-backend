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
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const format_sr_entity_1 = require("./format-sr.entity");
let FieldStringEntity = class FieldStringEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, fieldName: { required: true, type: () => String }, required: { required: true, type: () => Boolean }, position: { required: true, type: () => String }, length: { required: true, type: () => Number }, defaultValue: { required: true, type: () => String }, formatSr: { required: true, type: () => require("./format-sr.entity").default } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], FieldStringEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "field_name", type: "varchar", length: 30 }),
    __metadata("design:type", String)
], FieldStringEntity.prototype, "fieldName", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean" }),
    __metadata("design:type", Boolean)
], FieldStringEntity.prototype, "required", void 0);
__decorate([
    typeorm_1.Column({ type: "tinyint", nullable: true }),
    __metadata("design:type", String)
], FieldStringEntity.prototype, "position", void 0);
__decorate([
    typeorm_1.Column({ type: "smallint" }),
    __metadata("design:type", Number)
], FieldStringEntity.prototype, "length", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 255, name: "default_value", nullable: true }),
    __metadata("design:type", String)
], FieldStringEntity.prototype, "defaultValue", void 0);
__decorate([
    typeorm_1.ManyToOne(() => format_sr_entity_1.default, () => (formatSr) => formatSr.stringFields, {
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: "format_sr_id" }),
    __metadata("design:type", format_sr_entity_1.default)
], FieldStringEntity.prototype, "formatSr", void 0);
FieldStringEntity = __decorate([
    typeorm_1.Entity('field_string')
], FieldStringEntity);
exports.default = FieldStringEntity;
//# sourceMappingURL=field-string-sr.entity.js.map