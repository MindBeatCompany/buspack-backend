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
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const create_boolean_field_dto_1 = require("./create-boolean-field.dto");
class UpdateBooleanFieldDto extends mapped_types_1.PartialType(mapped_types_1.OmitType(create_boolean_field_dto_1.default, ["defaultValue"])) {
    static _OPENAPI_METADATA_FACTORY() {
        return { defaultValue: { required: true, type: () => Boolean } };
    }
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateBooleanFieldDto.prototype, "defaultValue", void 0);
exports.default = UpdateBooleanFieldDto;
//# sourceMappingURL=update-boolean-field.dto.js.map