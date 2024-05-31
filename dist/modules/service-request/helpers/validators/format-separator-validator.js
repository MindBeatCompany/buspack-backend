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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const format_sr_entity_1 = require("../../entities/format-sr.entity");
let FormatSeparatorValidator = class FormatSeparatorValidator {
    constructor(fsrRepository) {
        this.fsrRepository = fsrRepository;
    }
    async validate(value, args) {
        const accountId = args.object.accountId;
        const [relatedFormat, relatedSeparator] = args.constraints;
        let format = args.object[relatedFormat];
        let separator = args.object[relatedSeparator];
        let fsr = null;
        if (format == null) {
            fsr = await this.fsrRepository.findOne({
                where: { accountId: accountId }
            });
            format = fsr.format;
        }
        if (separator == null && format !== "xls") {
            fsr = await this.fsrRepository.findOne({
                where: { accountId: accountId }
            });
            separator = fsr.separator;
        }
        return ((format === "xls" && separator == null) ||
            (format === "csv" && (separator === "comma" || separator === "semicolon")) ||
            (format === "txt" && (separator === "semicolon" || separator === "tab" || separator === "doubleComma")));
    }
    defaultMessage(args) {
        return "Incorrect combination between format and separator";
    }
};
FormatSeparatorValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: "formatSeparator", async: true }),
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(format_sr_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FormatSeparatorValidator);
exports.default = FormatSeparatorValidator;
//# sourceMappingURL=format-separator-validator.js.map