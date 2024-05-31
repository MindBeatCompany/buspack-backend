import { Repository } from "typeorm";
import { AccountEntity } from "src/modules/account/entities/account.entity";
import { TariffEntity } from "src/modules/user/entities";
export default abstract class ServiceRequestValidator {
    private readonly tariffRepository;
    constructor(tariffRepository: Repository<TariffEntity>);
    validate(rawData: any[], account: AccountEntity, dtv: any, isFileUploading: any): Promise<any[]>;
    protected abstract validateRowData(row: any, dtv: any, isFileUploading: boolean): any;
    protected getAttrCantBeEmptyErrMsge(): string;
    protected setError(response: {
        value: any;
        status: string;
        error: string;
    }, error: string): {
        value: any;
        status: string;
        error: string;
    };
    protected getHomeDeliveryErrorMsge(): string;
    protected getCantValidateAFOnHDErrorMsge(): string;
    protected getCastedToNumOrError(value: any, srFieldResponse: {
        value: any;
        status: string;
        error: string;
    }): {
        value: any;
        status: string;
        error: string;
    };
    protected getCanBeEmpty(fieldName: string): boolean;
}
