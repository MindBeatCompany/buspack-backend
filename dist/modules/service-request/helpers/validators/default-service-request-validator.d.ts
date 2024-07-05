import ServiceRequestValidator from "./service-request-validator";
export default class DefaultServiceRequestValidator extends ServiceRequestValidator {
    protected validateRowData(row: any, dtv: any, isFileUploading: boolean): {
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
        addressApartment: {
            value: any;
            status: string;
            error: string;
        };
        addressBuild: {
            value: any;
            status: string;
            error: string;
        };
        addressCpa: {
            value: any;
            status: string;
            error: string;
        };
        addressNumber: {
            value: any;
            status: string;
            error: string;
        };
        addressFloor: {
            value: any;
            status: string;
            error: string;
        };
        addressStreet: {
            value: any;
            status: string;
            error: string;
        };
        enabledPlace: {
            value: any;
            status: string;
            error: string;
        };
        locality: {
            value: any;
            status: string;
            error: string;
        };
        province: {
            value: any;
            status: string;
            error: string;
        };
        cpa: {
            value: any;
            status: string;
            error: string;
        };
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
    private validateDocNumber;
    private validateHomeDelivery;
    validateAttributte(value: any, type: string, empty?: boolean): {
        value: any;
        status: string;
        error: string;
    };
}
