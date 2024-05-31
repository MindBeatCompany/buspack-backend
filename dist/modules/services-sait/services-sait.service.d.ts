import { HttpService } from '@nestjs/axios';
import { SaitResponseStatusDeliveryInterface } from "./interfaces/index";
import { AccountService } from "../account/account.service";
export declare class ServicesSaitService {
    private readonly http;
    private readonly acountService;
    private readonly _saitCredential;
    private readonly _urlSait;
    private _token;
    private saitUrl;
    private cuitUrl;
    constructor(http: HttpService, acountService: AccountService);
    saitAccessToken(): Promise<any>;
    saitFileUpload2(filepath: string, token: string): Promise<any>;
    saitFileUpload(filepath: string, token: string): Promise<any>;
    saitValidate(idarchivo: string, token: string): Promise<any>;
    saitValidationResult(idarchivo: string, token: string): Promise<any>;
    saitProcess(idarchivo: string, token: string): Promise<any>;
    saitProcessResult(idarchivo: string, token: string): Promise<any>;
    saitStatus(idarchivo: string, token: string): Promise<any>;
    saitDeliveryStatus(numero: string, token: string): Promise<any>;
    mapSaitStatus(data: any): Promise<SaitResponseStatusDeliveryInterface>;
    getBuspackStatusById(cod: string): "Procesando su pedido" | "En sucursal de destino" | "Entregado" | "En distribucion" | "En Agencia Origen" | "En camino";
    getBuspackStatusByAlphanumeric(cod: string): Promise<string>;
    getCustomerAccountByCuil(code: string, token: string): Promise<any>;
}
