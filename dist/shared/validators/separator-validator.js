"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparatorValidator = void 0;
const class_validator_1 = require("class-validator");
let SeparatorValidator = class SeparatorValidator {
    validate(text, args) {
        return text === 'comma' ||
            text === 'semicolon' ||
            text === 'tab' ||
            text === 'doubleComma' ||
            text === null;
    }
    defaultMessage(args) {
        return 'Incorrect separator';
    }
};
SeparatorValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: 'separator', async: false })
], SeparatorValidator);
exports.SeparatorValidator = SeparatorValidator;
//# sourceMappingURL=separator-validator.js.map