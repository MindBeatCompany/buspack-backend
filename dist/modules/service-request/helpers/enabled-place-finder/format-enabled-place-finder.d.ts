import { Repository } from "typeorm";
import AccountLocalityEntity from "src/modules/service-request/entities/account-locality.entity";
import { EnabledPlaceEntity } from "src/modules/enabled-places/entities/enabled-places.entity";
export default class FormatEnabledPlaceFinder {
    private accountLocalityRepository;
    private enabledPlaceRepository;
    constructor(accountLocalityRepository: Repository<AccountLocalityEntity>, enabledPlaceRepository: Repository<EnabledPlaceEntity>);
    find(enabledPlace: any, locality: any, province: any, cpa: any, accountLocalities: AccountLocalityEntity[], dtv: any): Promise<{
        enabledPlace: any;
        locality: any;
        province: any;
        cpa: any;
    }>;
    private setEPError;
    private setEPNotFoundError;
    private getReviewThisFielMsge;
    private notIgnoredFields;
    private findAccountLocalityMatch;
    private doesEPValuesMatch;
    private getEpFieldValue;
    private getFieldsToMakeFindAL;
    private getFieldRegex;
    private getFieldsToMakeFind;
}
