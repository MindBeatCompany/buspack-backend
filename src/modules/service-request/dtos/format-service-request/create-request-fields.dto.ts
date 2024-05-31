
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import CreateStringFieldDto from "./create-string-field.dto";
import CreateBooleanFieldDto from "./create-boolean-field.dto";
import CreateNumericFieldDto from "./create-numeric-field.dto";

export default class CreateRequestFieldsDto {

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    addressApartment: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    addressBuilding: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    addressCpa: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    addressFloor: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateNumericFieldDto)
    addressNumber: CreateNumericFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    addressStreet: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    cpa: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    docNumber: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    docType: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    email: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    enabledPlace: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    locality: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    observations: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    phone: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    province: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateNumericFieldDto)
    qtyPieces: CreateNumericFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    recipientFullname: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateStringFieldDto)
    requestId: CreateStringFieldDto;

    @ValidateNested()
    @Type(() => CreateNumericFieldDto)
    totalWeight: CreateNumericFieldDto;

    @ValidateNested()
    @Type(() => CreateBooleanFieldDto)
    homeDelivery: CreateBooleanFieldDto
}
