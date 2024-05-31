import { Repository } from "typeorm";
import FieldBooleanEntity from "../../entities/field-boolean-sr.entity";
import FieldNumberEntity from "../../entities/field-number-sr.entity";
import FieldStringEntity from "../../entities/field-string-sr.entity";
export default class UpdateFsrValidator {
    private fieldBooleanRepository;
    private fieldStrinRepository;
    private fieldNumberRepository;
    constructor(fieldBooleanRepository: Repository<FieldBooleanEntity>, fieldStrinRepository: Repository<FieldStringEntity>, fieldNumberRepository: Repository<FieldNumberEntity>);
    validate(requestFields: any): Promise<boolean>;
    private validateAux;
}
