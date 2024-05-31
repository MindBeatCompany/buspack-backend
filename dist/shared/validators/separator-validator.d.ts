import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class SeparatorValidator implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
