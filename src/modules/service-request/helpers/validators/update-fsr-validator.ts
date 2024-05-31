
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository} from "@nestjs/typeorm";

import FieldBooleanEntity from "../../entities/field-boolean-sr.entity";
import FieldNumberEntity from "../../entities/field-number-sr.entity";
import FieldStringEntity from "../../entities/field-string-sr.entity";

@Injectable()
export default class UpdateFsrValidator {

    constructor(
        @InjectRepository(FieldBooleanEntity)
        private fieldBooleanRepository: Repository<FieldBooleanEntity>,
        @InjectRepository(FieldStringEntity)
        private fieldStrinRepository: Repository<FieldStringEntity>,
        @InjectRepository(FieldNumberEntity)
        private fieldNumberRepository: Repository<FieldNumberEntity>
    ) { }

    public async validate(requestFields: any) {
        const keys = Object.keys(requestFields);

        for (let i = 0; i < keys.length; i++) {
            // fn = fieldname
            let fn = requestFields[keys[i]];
            const isValidReqField = this.validateAux(fn);
            if (!isValidReqField) return false;
        }

        return true;
    }

    private validateAux(fieldGiven: any) {
        // fgDf = field given default value
        const fgDf = fieldGiven.defaultValue;
        const fgPos = fieldGiven.position;

        return (fgDf !== null && fgPos === null) || (fgDf === null && fgPos !== null);
    }

}
