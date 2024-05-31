
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import UpdateStringFieldDto from "./update-string-field.dto";
import UpdateBooleanFieldDto from "./update-boolean-field.dto";
import UpdateNumericFieldDto from "./update-numeric-field.dto";

export default class UpdateRequestFieldsDto {

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    addressApartment: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    addressBuilding: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    addressCpa: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    addressFloor: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateNumericFieldDto)
    addressNumber: UpdateNumericFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    addressStreet: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    cpa: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    docNumber: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    docType: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    email: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    enabledPlace: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    locality: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    observations: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    phone: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    province: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateNumericFieldDto)
    qtyPieces: UpdateNumericFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    recipientFullname: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateStringFieldDto)
    requestId: UpdateStringFieldDto;

    @ValidateNested()
    @Type(() => UpdateNumericFieldDto)
    totalWeight: UpdateNumericFieldDto;

    @ValidateNested()
    @Type(() => UpdateBooleanFieldDto)
    homeDelivery: UpdateBooleanFieldDto
}
