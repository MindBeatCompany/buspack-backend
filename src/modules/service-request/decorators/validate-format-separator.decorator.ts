
import { registerDecorator, ValidationOptions } from "class-validator";

import FormatSeparatorValidator from "../helpers/validators/format-separator-validator";

export function ValidateFormatSeparator(format: string, separator: string, validateOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validateOptions,
            constraints: [format, separator],
            validator: FormatSeparatorValidator
        });
    }
}
