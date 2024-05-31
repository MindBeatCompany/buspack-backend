
import { registerDecorator, ValidationOptions } from "class-validator";

import PositionDefaultValueValidator from "../helpers/validators/position-default-value-validator"

export function ValidatePositionDefaultValue(property: string, type: string, validateOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validateOptions,
            constraints: [property, type],
            validator: PositionDefaultValueValidator
        })
    }
}
