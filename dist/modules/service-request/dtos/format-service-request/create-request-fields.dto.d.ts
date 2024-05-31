import CreateStringFieldDto from "./create-string-field.dto";
import CreateBooleanFieldDto from "./create-boolean-field.dto";
import CreateNumericFieldDto from "./create-numeric-field.dto";
export default class CreateRequestFieldsDto {
    addressApartment: CreateStringFieldDto;
    addressBuilding: CreateStringFieldDto;
    addressCpa: CreateStringFieldDto;
    addressFloor: CreateStringFieldDto;
    addressNumber: CreateNumericFieldDto;
    addressStreet: CreateStringFieldDto;
    cpa: CreateStringFieldDto;
    docNumber: CreateStringFieldDto;
    docType: CreateStringFieldDto;
    email: CreateStringFieldDto;
    enabledPlace: CreateStringFieldDto;
    locality: CreateStringFieldDto;
    observations: CreateStringFieldDto;
    phone: CreateStringFieldDto;
    province: CreateStringFieldDto;
    qtyPieces: CreateNumericFieldDto;
    recipientFullname: CreateStringFieldDto;
    requestId: CreateStringFieldDto;
    totalWeight: CreateNumericFieldDto;
    homeDelivery: CreateBooleanFieldDto;
}
