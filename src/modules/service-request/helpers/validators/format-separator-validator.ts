
import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import FormatServiceRequestEntity from 'src/modules/service-request/entities/format-sr.entity';

/**
 * Validador entre las properties separator y format
 */
@ValidatorConstraint({ name: "formatSeparator", async: true })
@Injectable()
export default class FormatSeparatorValidator {

    constructor(
        @InjectRepository(FormatServiceRequestEntity)
        private readonly fsrRepository: Repository<FormatServiceRequestEntity>
    ) { }

    async validate(value: any, args: ValidationArguments) {
        const accountId = (args.object as any).accountId;
        const [relatedFormat, relatedSeparator] = args.constraints;
        let format = (args.object as any)[relatedFormat];
        let separator = (args.object as any)[relatedSeparator];
        let fsr = null

        if (format == null) {
            fsr = await this.fsrRepository.findOne({
                where: {accountId: accountId}
            });
            format = fsr.format;
        }

        if (separator == null && format !== "xls") {
            fsr = await this.fsrRepository.findOne({
                where: {accountId: accountId}
            })
            separator = fsr.separator
        }

        return ((format === "xls" && separator == null) ||
                (format === "csv" && (separator === "comma" || separator === "semicolon" )) ||
                (format === "txt" && (separator === "semicolon" || separator === "tab" || separator === "doubleComma")));
    }

    defaultMessage(args: ValidationArguments): string {
        return "Incorrect combination between format and separator";
    }
}
