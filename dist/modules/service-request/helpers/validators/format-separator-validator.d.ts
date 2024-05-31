import { ValidationArguments } from 'class-validator';
import { Repository } from 'typeorm';
import FormatServiceRequestEntity from 'src/modules/service-request/entities/format-sr.entity';
export default class FormatSeparatorValidator {
    private readonly fsrRepository;
    constructor(fsrRepository: Repository<FormatServiceRequestEntity>);
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
