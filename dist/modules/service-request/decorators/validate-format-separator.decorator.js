"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateFormatSeparator = void 0;
const class_validator_1 = require("class-validator");
const format_separator_validator_1 = require("../helpers/validators/format-separator-validator");
function ValidateFormatSeparator(format, separator, validateOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName,
            options: validateOptions,
            constraints: [format, separator],
            validator: format_separator_validator_1.default
        });
    };
}
exports.ValidateFormatSeparator = ValidateFormatSeparator;
//# sourceMappingURL=validate-format-separator.decorator.js.map