"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
let PositionDefaultValueValidator = class PositionDefaultValueValidator {
    validate(defaultValue, args) {
        const [relatedPosition] = args.constraints;
        const position = args.object[relatedPosition];
        const type = args.constraints[1];
        if ((position != null && defaultValue != null) && (position == null && defaultValue == null))
            return false;
        return ((position != null && defaultValue == null) ||
            (position == null && defaultValue != null)) &&
            this.isType(defaultValue, type);
    }
    defaultMessage(args) {
        return "Incorrect combination between position and default value or incorrect type on default value";
    }
    isType(defaultValue, type) {
        let res = null;
        if (defaultValue == null) {
            res = true;
        }
        else {
            switch (type) {
                case "string": {
                    res = typeof (defaultValue) === "string";
                    break;
                }
                case "boolean": {
                    res = typeof (defaultValue) === "boolean";
                    break;
                }
                case "number": {
                    res = typeof (defaultValue) === "number";
                    break;
                }
            }
        }
        return res;
    }
};
PositionDefaultValueValidator = __decorate([
    class_validator_1.ValidatorConstraint({ name: "positionDefaultValue", async: false })
], PositionDefaultValueValidator);
exports.default = PositionDefaultValueValidator;
//# sourceMappingURL=position-default-value-validator.js.map