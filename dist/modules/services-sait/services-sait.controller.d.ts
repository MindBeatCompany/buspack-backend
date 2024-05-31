/// <reference types="multer" />
import { ServicesSaitService } from "./services-sait.service";
import { AccountService } from "../account/account.service";
export declare class ServicesSaitController {
    private readonly service;
    private readonly acountService;
    constructor(service: ServicesSaitService, acountService: AccountService);
    saitAccessToken(res: any): Promise<any>;
    uploadFile(file: Express.Multer.File, req: any, res: any): Promise<any>;
    saitValidate(req: any, res: any): Promise<any>;
    saiValidationResult(req: any, res: any): Promise<any>;
    saitProcess(req: any, res: any): Promise<any>;
    saitProcessResult(req: any, res: any): Promise<any>;
    saitStatus(req: any, res: any): Promise<any>;
    saitStatusDelivery(req: any, res: any): Promise<any>;
    getCustomerByCuil(code: any, req: any, res: any): Promise<any>;
}
