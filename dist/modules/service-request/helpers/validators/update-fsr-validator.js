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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const field_boolean_sr_entity_1 = require("../../entities/field-boolean-sr.entity");
const field_number_sr_entity_1 = require("../../entities/field-number-sr.entity");
const field_string_sr_entity_1 = require("../../entities/field-string-sr.entity");
let UpdateFsrValidator = class UpdateFsrValidator {
    constructor(fieldBooleanRepository, fieldStrinRepository, fieldNumberRepository) {
        this.fieldBooleanRepository = fieldBooleanRepository;
        this.fieldStrinRepository = fieldStrinRepository;
        this.fieldNumberRepository = fieldNumberRepository;
    }
    async validate(requestFields) {
        const keys = Object.keys(requestFields);
        for (let i = 0; i < keys.length; i++) {
            let fn = requestFields[keys[i]];
            const isValidReqField = this.validateAux(fn);
            if (!isValidReqField)
                return false;
        }
        return true;
    }
    validateAux(fieldGiven) {
        const fgDf = fieldGiven.defaultValue;
        const fgPos = fieldGiven.position;
        return (fgDf !== null && fgPos === null) || (fgDf === null && fgPos !== null);
    }
};
UpdateFsrValidator = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(field_boolean_sr_entity_1.default)),
    __param(1, typeorm_2.InjectRepository(field_string_sr_entity_1.default)),
    __param(2, typeorm_2.InjectRepository(field_number_sr_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], UpdateFsrValidator);
exports.default = UpdateFsrValidator;
//# sourceMappingURL=update-fsr-validator.js.map