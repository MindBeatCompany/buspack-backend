"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePositionDefaultValue = void 0;
const class_validator_1 = require("class-validator");
const position_default_value_validator_1 = require("../validators/position-default-value-validator");
function ValidatePositionDefaultValue(property, type, validateOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validateOptions,
            constraints: [property, type],
            validator: position_default_value_validator_1.default
        });
    };
}
exports.ValidatePositionDefaultValue = ValidatePositionDefaultValue;
//# sourceMappingURL=validate-position-default-value.decorator.js.map