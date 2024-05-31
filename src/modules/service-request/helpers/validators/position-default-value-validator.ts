
import { ValidationArguments, ValidatorConstraint } from 'class-validator';

@ValidatorConstraint({ name: "positionDefaultValue", async: false })
export default class PositionDefaultValueValidator {

    validate(defaultValue: any, args: ValidationArguments) {
        const [relatedPosition] = args.constraints;
        let position = (args.object as any)[relatedPosition];
        let type = args.constraints[1];

        return !(position != null && defaultValue != null && type != 'boolean') && this.isType(defaultValue, type);
    }

    defaultMessage(args: ValidationArguments): string {
        return "Incorrect combination between position and default value or incorrect type on default value";
    }

    private isType(defaultValue: any, type: string) {
        let res = null;

        if (defaultValue == null) {
            res = true;
        } else {
            switch(type) {
                case "string": {
                    res = typeof(defaultValue) === "string";
                    break;
                }
                case "boolean": {
                    res = typeof(defaultValue) === "boolean";
                    break;
                }
                case "number": {
                    res = typeof(defaultValue) === "number";
                    break;
                }
                case "numberOrString": {
                    res = typeof(defaultValue) === "number" || typeof(defaultValue) === "string";
                    break;
                }
            }
        }

        return res;
    }
}
