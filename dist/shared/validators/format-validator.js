"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatValidator = void 0;
const class_validator_1 = require("class-validator");
let FormatValidator = class FormatValidator {
    validate(text, args) {
        return text === 'csv' || text === 'txt' || text === 'xls';
    }
    defaultMessage(args) {
        return 'Incorrect format type';
    }
};
FormatValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'formatType', async: false })
], FormatValidator);
exports.FormatValidator = FormatValidator;
//# sourceMappingURL=format-validator.js.map