import { ValidationArguments } from 'class-validator';
export default class PositionDefaultValueValidator {
    validate(defaultValue: any, args: ValidationArguments): any;
    defaultMessage(args: ValidationArguments): string;
    private isType;
}
