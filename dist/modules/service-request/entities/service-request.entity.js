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
exports.ServiceRequestEntity = void 0;
const openapi = require("@nestjs/swagger");
const account_entity_1 = require("../../account/entities/account.entity");
const typeorm_1 = require("typeorm");
let ServiceRequestEntity = class ServiceRequestEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, account: { required: true, type: () => require("../../account/entities/account.entity").AccountEntity }, requestId: { required: true, type: () => String }, recipientFullname: { required: true, type: () => String }, docType: { required: true, type: () => String }, docNumber: { required: true, type: () => Number }, phone: { required: true, type: () => String }, email: { required: true, type: () => String }, addressStreet: { required: true, type: () => String }, addressNumber: { required: true, type: () => String }, addressBuilding: { required: true, type: () => String }, addressFloor: { required: true, type: () => String }, addressApartment: { required: true, type: () => String }, addressCpa: { required: true, type: () => String }, enabledPlace: { required: true, type: () => String }, locality: { required: true, type: () => String }, province: { required: true, type: () => String }, cpa: { required: true, type: () => String }, qtyPieces: { required: true, type: () => Number }, totalWeight: { required: true, type: () => Number }, homeDelivery: { required: true, type: () => Boolean }, observations: { required: true, type: () => String }, idfile: { required: true, type: () => String }, link: { required: true, type: () => String }, voucher: { required: true, type: () => String }, delivery: { required: true, type: () => String }, status: { required: true, type: () => String }, statusDatetime: { required: true, type: () => Date }, updateAt: { required: true, type: () => Date }, createdAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ServiceRequestEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => account_entity_1.AccountEntity, (account) => account.serviceRequest),
    __metadata("design:type", account_entity_1.AccountEntity)
], ServiceRequestEntity.prototype, "account", void 0);
__decorate([
    typeorm_1.Column({ name: "request_id", type: "varchar", length: 50 }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "requestId", void 0);
__decorate([
    typeorm_1.Column({ name: "recipient_fullname", type: "varchar", length: 50 }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "recipientFullname", void 0);
__decorate([
    typeorm_1.Column({ name: "doc_type", type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "docType", void 0);
__decorate([
    typeorm_1.Column({ name: "doc_number", type: "int", nullable: false }),
    __metadata("design:type", Number)
], ServiceRequestEntity.prototype, "docNumber", void 0);
__decorate([
    typeorm_1.Column({ name: "phone", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ name: "email", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ name: "address_street", type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "addressStreet", void 0);
__decorate([
    typeorm_1.Column({ name: "address_number", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "addressNumber", void 0);
__decorate([
    typeorm_1.Column({ name: "address_building", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "addressBuilding", void 0);
__decorate([
    typeorm_1.Column({ name: "address_floor", type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "addressFloor", void 0);
__decorate([
    typeorm_1.Column({ name: "address_apartment", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "addressApartment", void 0);
__decorate([
    typeorm_1.Column({ name: "address_cpa", type: "varchar", length: 10, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "addressCpa", void 0);
__decorate([
    typeorm_1.Column({ name: "enabled_place", type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "enabledPlace", void 0);
__decorate([
    typeorm_1.Column({ name: "locality", type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "locality", void 0);
__decorate([
    typeorm_1.Column({ name: "province", type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "province", void 0);
__decorate([
    typeorm_1.Column({ name: "cpa", type: "varchar", length: 50, nullable: false }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "cpa", void 0);
__decorate([
    typeorm_1.Column({ name: "qty_pieces", type: "int", nullable: false }),
    __metadata("design:type", Number)
], ServiceRequestEntity.prototype, "qtyPieces", void 0);
__decorate([
    typeorm_1.Column({
        name: "total_weight",
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0,
        nullable: false
    }),
    __metadata("design:type", Number)
], ServiceRequestEntity.prototype, "totalWeight", void 0);
__decorate([
    typeorm_1.Column({ name: "home_delivery", type: "boolean", default: false, nullable: false }),
    __metadata("design:type", Boolean)
], ServiceRequestEntity.prototype, "homeDelivery", void 0);
__decorate([
    typeorm_1.Column({ name: "observations", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "observations", void 0);
__decorate([
    typeorm_1.Column({ name: "idfile", type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "idfile", void 0);
__decorate([
    typeorm_1.Column({ name: "link", type: "varchar", length: 100, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "link", void 0);
__decorate([
    typeorm_1.Column({ name: "voucher", type: "varchar", length: 30, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "voucher", void 0);
__decorate([
    typeorm_1.Column({ name: "delivery", type: "text", nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "delivery", void 0);
__decorate([
    typeorm_1.Column({ name: "status", type: "varchar", length: 30, nullable: true }),
    __metadata("design:type", String)
], ServiceRequestEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ name: "status_datetime", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], ServiceRequestEntity.prototype, "statusDatetime", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: "updated_at", type: "timestamp" }),
    __metadata("design:type", Date)
], ServiceRequestEntity.prototype, "updateAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: "created_at", type: "timestamp" }),
    __metadata("design:type", Date)
], ServiceRequestEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: "deleted_at", type: "timestamp" }),
    __metadata("design:type", Date)
], ServiceRequestEntity.prototype, "deletedAt", void 0);
ServiceRequestEntity = __decorate([
    typeorm_1.Entity("service-request")
], ServiceRequestEntity);
exports.ServiceRequestEntity = ServiceRequestEntity;
//# sourceMappingURL=service-request.entity.js.map