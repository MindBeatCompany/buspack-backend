import UpdateStringFieldDto from "./update-string-field.dto";
import UpdateBooleanFieldDto from "./update-boolean-field.dto";
import UpdateNumericFieldDto from "./update-numeric-field.dto";
export default class UpdateRequestFieldsDto {
    addressApartment: UpdateStringFieldDto;
    addressBuilding: UpdateStringFieldDto;
    addressCpa: UpdateStringFieldDto;
    addressFloor: UpdateStringFieldDto;
    addressNumber: UpdateNumericFieldDto;
    addressStreet: UpdateStringFieldDto;
    cpa: UpdateStringFieldDto;
    docNumber: UpdateStringFieldDto;
    docType: UpdateStringFieldDto;
    email: UpdateStringFieldDto;
    enabledPlace: UpdateStringFieldDto;
    locality: UpdateStringFieldDto;
    observations: UpdateStringFieldDto;
    phone: UpdateStringFieldDto;
    province: UpdateStringFieldDto;
    qtyPieces: UpdateNumericFieldDto;
    recipientFullname: UpdateStringFieldDto;
    requestId: UpdateStringFieldDto;
    totalWeight: UpdateNumericFieldDto;
    homeDelivery: UpdateBooleanFieldDto;
}
