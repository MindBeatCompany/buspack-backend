import { ServiceRequestEntity } from "./entities/service-request.entity";
import { ServiceRequestService } from "./service-request.service";
import { CreateServiceRequestDto } from './dtos/create-service-request.dto';
import { CreateFormatServiceRequestDto } from "./dtos/format-service-request/create-format-service-request.dto";
import UpdateFormatServiceRequestDto from "./dtos/format-service-request/update-format-service-request.dto";
export declare class ServiceRequestController {
    private readonly serviceServRequest;
    constructor(serviceServRequest: ServiceRequestService);
    getAllServiceRequest(res: any): Promise<any>;
    getByRequestIdVoucherAndDelivery(requestId: string, voucher: string, delivery: string, res: any): Promise<any>;
    getByQuery(requestId: string, voucher: string, delivery: string, fromDate: string, toDate: string, res: any): Promise<any>;
    uploadServiceRequest(res: any, file: any, isStandardFormat: string): Promise<ServiceRequestEntity>;
    downloadTemplateFile(res: any): Promise<void>;
    createRequest(res: any, body: CreateServiceRequestDto[], isStandardFormat: string): Promise<any>;
    createFormatServiceRequest(res: any, body: CreateFormatServiceRequestDto): Promise<any>;
    getFormatServiceRequest(res: any, accountId: number): Promise<any>;
    updateFormatServiceRequest(res: any, body: UpdateFormatServiceRequestDto): Promise<any>;
    getFormatLocalitiesXls(res: any, accountId?: number): Promise<any>;
    uploadFormatLocalitiesXls(res: any, accountId: number, file: any): Promise<any>;
    getFormatLocalitiesXlsAccount(res: any, accountId: number): Promise<any>;
    updateFormatLocalitiesXlsAccount(res: any, accountId: number, file: any): Promise<any>;
}
