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
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_2 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_format_service_request_dto_1 = require("./create-format-service-request.dto");
const update_request_fields_dto_1 = require("./update-request-fields.dto");
class UpdateFormatServiceRequestDto extends mapped_types_1.PartialType(mapped_types_1.OmitType(create_format_service_request_dto_1.CreateFormatServiceRequestDto, ["accountId", "requestFields"])) {
    static _OPENAPI_METADATA_FACTORY() {
        return { accountId: { required: true, type: () => Number }, requestFields: { required: true, type: () => require("./update-request-fields.dto").default } };
    }
}
__decorate([
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], UpdateFormatServiceRequestDto.prototype, "accountId", void 0);
__decorate([
    class_validator_2.ValidateNested(),
    class_transformer_1.Type(() => update_request_fields_dto_1.default),
    __metadata("design:type", update_request_fields_dto_1.default)
], UpdateFormatServiceRequestDto.prototype, "requestFields", void 0);
exports.default = UpdateFormatServiceRequestDto;
//# sourceMappingURL=update-format-service-request.dto.js.map