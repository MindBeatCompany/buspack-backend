import ServiceRequestValidator from "./service-request-validator";
export default class FormatServiceRequestValidator extends ServiceRequestValidator {
    protected validateRowData(row: any, dtv: any, isFileUploading: any): {
        requestId: {
            value: any;
            status: string;
            error: string;
        };
        recipientFullname: {
            value: any;
            status: string;
            error: string;
        };
        docType: {
            value: any;
            status: string;
            error: string;
        };
        docNumber: {
            value: any;
            status: string;
            error: string;
        };
        phone: {
            value: any;
            status: string;
            error: string;
        };
        email: {
            value: any;
            status: string;
            error: string;
        };
        addressApartment: {};
        addressBuild: {};
        addressCpa: {};
        addressNumber: {};
        addressFloor: {};
        addressStreet: {};
        enabledPlace: any;
        locality: any;
        province: any;
        cpa: any;
        qtyPieces: {
            value: any;
            status: string;
            error: string;
        };
        totalWeight: {
            value: any;
            status: string;
            error: string;
        };
        observations: {
            value: any;
            status: string;
            error: string;
        };
        homeDelivery: {
            value: any;
            status: string;
            error: string;
        };
    };
    private getAddressBuilding;
    private getMustCompleteAtLeastTwoFieldsMsge;
    private validateAddress;
    private valueHasValidLength;
    private getDefaultValue;
    private validateValue;
    private validateHomeDelivery;
    private validateDocNumber;
    private validateEPValue;
    private getGetEpFieldsWithValueNull;
}
