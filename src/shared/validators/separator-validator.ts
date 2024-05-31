
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'separator', async: false })
export class SeparatorValidator implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {
        return text === 'comma' || 
               text === 'semicolon' || 
               text === 'tab' ||
               text === 'doubleComma' ||
               text === null;     
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Incorrect separator';
    }
}