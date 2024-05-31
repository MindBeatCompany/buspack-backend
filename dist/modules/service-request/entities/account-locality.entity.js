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
let AccountLocalityEntity = class AccountLocalityEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, accountId: { required: true, type: () => Number }, enabledPlaceId: { required: true, type: () => Number }, locality: { required: true, type: () => String }, province: { required: true, type: () => String }, cp: { required: true, type: () => String } };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AccountLocalityEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "account_id", type: "smallint" }),
    __metadata("design:type", Number)
], AccountLocalityEntity.prototype, "accountId", void 0);
__decorate([
    typeorm_1.Column({ name: "enabled_place_id", type: "smallint" }),
    __metadata("design:type", Number)
], AccountLocalityEntity.prototype, "enabledPlaceId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], AccountLocalityEntity.prototype, "locality", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], AccountLocalityEntity.prototype, "province", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], AccountLocalityEntity.prototype, "cp", void 0);
AccountLocalityEntity = __decorate([
    typeorm_1.Entity("account_locality")
], AccountLocalityEntity);
exports.default = AccountLocalityEntity;
//# sourceMappingURL=account-locality.entity.js.map