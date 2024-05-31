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
const field_string_sr_entity_1 = require("./field-string-sr.entity");
const field_number_sr_entity_1 = require("./field-number-sr.entity");
const field_boolean_sr_entity_1 = require("./field-boolean-sr.entity");
let FormatServiceRequestEntity = class FormatServiceRequestEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, format: { required: true, type: () => String }, separator: { required: true, type: () => String }, accountId: { required: true, type: () => Number }, stringFields: { required: true, type: () => [require("./field-string-sr.entity").default] }, numericFields: { required: true, type: () => [require("./field-number-sr.entity").default] }, booleanFields: { required: true, type: () => [require("./field-boolean-sr.entity").default] }, quoteChar: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], FormatServiceRequestEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 3 }),
    __metadata("design:type", String)
], FormatServiceRequestEntity.prototype, "format", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 11, nullable: true }),
    __metadata("design:type", String)
], FormatServiceRequestEntity.prototype, "separator", void 0);
__decorate([
    typeorm_1.Column({ name: "account_id" }),
    __metadata("design:type", Number)
], FormatServiceRequestEntity.prototype, "accountId", void 0);
__decorate([
    typeorm_1.OneToMany(() => field_string_sr_entity_1.default, (stringField) => stringField.formatSr),
    __metadata("design:type", Array)
], FormatServiceRequestEntity.prototype, "stringFields", void 0);
__decorate([
    typeorm_1.OneToMany(() => field_number_sr_entity_1.default, (numericField) => numericField.formatSr),
    __metadata("design:type", Array)
], FormatServiceRequestEntity.prototype, "numericFields", void 0);
__decorate([
    typeorm_1.OneToMany(() => field_boolean_sr_entity_1.default, (booleanField) => booleanField.formatSr),
    __metadata("design:type", Array)
], FormatServiceRequestEntity.prototype, "booleanFields", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar", length: 1, name: "quote_char" }),
    __metadata("design:type", String)
], FormatServiceRequestEntity.prototype, "quoteChar", void 0);
FormatServiceRequestEntity = __decorate([
    typeorm_1.Entity("format_sr")
], FormatServiceRequestEntity);
exports.default = FormatServiceRequestEntity;
//# sourceMappingURL=format-sr.entity.js.map