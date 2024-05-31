
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'formatType', async: false })
export class FormatValidator implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return text === 'csv' || text === 'txt' || text === 'xls';
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Incorrect format type';
    }
}