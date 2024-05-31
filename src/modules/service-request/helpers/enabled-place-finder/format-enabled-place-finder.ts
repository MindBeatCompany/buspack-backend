
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import AccountLocalityEntity from "src/modules/service-request/entities/account-locality.entity";
import { EnabledPlaceEntity } from "src/modules/enabled-places/entities/enabled-places.entity";
import { LocalityEntity } from "src/modules/enabled-places/entities/location.entity";

@Injectable()
export default class FormatEnabledPlaceFinder {

    constructor(
        @InjectRepository(AccountLocalityEntity)
        private accountLocalityRepository: Repository<AccountLocalityEntity>,
        @InjectRepository(EnabledPlaceEntity)
        private  enabledPlaceRepository: Repository<EnabledPlaceEntity>
    ) {

    }

    public async find(enabledPlace, locality, province, cpa, accountLocalities: AccountLocalityEntity[], dtv: any) {
        let res = {
                    enabledPlace: {...enabledPlace},
                    locality: {...locality},
                    province: {...province},
                    cpa: {...cpa}
                }

        // los campos a tener en cuenta para encontrar el enabled place son aquellos que
        // no son undefined o con espacios blancos
        let fieldsToMakeFind = this.getFieldsToMakeFind(
            {
                locality: {...locality},
                province: {...province},
                cpa: {...cpa}
            });

        // recorro las account localities hasta encontrar alguna que matchee con los campos de busqueda
        let accountLocalityMatch = accountLocalities.find(al => this.findAccountLocalityMatch(al, fieldsToMakeFind));

        let enabledPlaceRes = null;
        if (accountLocalityMatch != undefined) {
            try {
                enabledPlaceRes = await this.enabledPlaceRepository
                                            .createQueryBuilder("ep")
                                            .innerJoinAndSelect(LocalityEntity, "l", "ep.place_name = l.enabled_place")
                                            .where("ep.id = :enabledPlaceId", {enabledPlaceId: accountLocalityMatch.enabledPlaceId})
                                            .andWhere("ep.isActive = true")
                                            .getRawOne();
            } catch (e) {
                throw new Error(e);
            }

            if (enabledPlaceRes) {
                res.enabledPlace.value = enabledPlaceRes.ep_place_name;
                res.enabledPlace.status = "ok";
                res.locality.value = enabledPlaceRes.l_locality_name;
                res.province.value = enabledPlaceRes.l_province_name;
                res.cpa.value = enabledPlaceRes.l_zip_code;
            } else {
                res = this.setEPNotFoundError(res, dtv);
            }

        } else {
            res = this.setEPNotFoundError(res, dtv);
        }

        return res;
    }

    private setEPError(value, field: any, msge: string): any {
        field.status = "danger";
        field.value = value;
        field.error = msge;

        return field;
    }

    private setEPNotFoundError(res: { enabledPlace: any;
                                      locality: any;
                                      province: any;
                                      cpa: any; },
                                      dtv: any): { enabledPlace: any; locality: any; province: any; cpa: any; } {


        const notIgnoredFields = this.notIgnoredFields(dtv);

        notIgnoredFields.map(nif => {
            if (nif.fieldName === "locality") {
                res.locality.status = "danger";
                res.locality.error = this.getReviewThisFielMsge();
            }

            if (nif.fieldName === "province") {
                res.province.status = "danger";
                res.province.error = this.getReviewThisFielMsge();
            }

            if (nif.fieldName === "cpa") {
                res.cpa.status = "danger";
                res.cpa.error = this.getReviewThisFielMsge();
            }
        })

        res.enabledPlace = this.setEPError("", res.enabledPlace, "No se pudo encontrar el lugar habilitado con la información brindada");
        return res;
    }

    private getReviewThisFielMsge(): string {
        return "Revise este campo para obtener el lugar habilitado y vuelva a subir el archivo";
    }

    private notIgnoredFields(dtv: any) {
        let res = [];
        dtv.forEach(d => {
            if (d.position !== null) {
                res.push(d);
            }
        })

        return res;
    }

    private findAccountLocalityMatch(accountLocality: AccountLocalityEntity, fieldsToMakeFind: any[]): any {
        const ftmf = fieldsToMakeFind;
        // ftmfAL = fields to make fin account locality
        const ftmfAL = this.getFieldsToMakeFindAL(accountLocality);
        const ftmfALKeys = ftmfAL.map(f => Object.keys(f)[0]);
        
        let canFindAL = true;

        for (let i = 0; i < ftmfALKeys.length; i++) {
            let ftmfALvalue = this.getEpFieldValue(ftmfAL, ftmfALKeys[i]);
            let ftmfValue = this.getEpFieldValue(ftmf, ftmfALKeys[i]);

            if (ftmfValue != null && canFindAL) {
                canFindAL = canFindAL && this.doesEPValuesMatch(ftmfALvalue, ftmfValue) 
            } else {
                return null;
            }
        }

        if (canFindAL) {
            return accountLocality
        } else {
            return null;
        }
    }

    private doesEPValuesMatch(valueGiven: string, valueToCompare: string): boolean {
        const regex = this.getFieldRegex(valueGiven.trim());
        valueToCompare = valueToCompare.trim();
        return Boolean(valueToCompare.match(regex))
    }

    private getEpFieldValue(fieldsToMakeFind: any[], key: string) {
        let res = fieldsToMakeFind.find(f => Object.keys(f)[0] === key);

        if (res) {
            return res[key]
        }

        return res;
    }

    private getFieldsToMakeFindAL(accountLocality: AccountLocalityEntity) {
        let res = [];
        if (accountLocality.locality !== null) res.push({"locality": accountLocality.locality})
        if (accountLocality.province !== null) res.push({"province": accountLocality.province})
        if (accountLocality.cp !== null) res.push({"cpa": accountLocality.cp})

        return res;
    }

    private getFieldRegex(value: string) {
        const pattern = `^${value}$`;
        return new RegExp(pattern, 'i');
    }

    private getFieldsToMakeFind(fields) {
        let res = [];
        let keys = Object.keys(fields);
        keys.map((k) => {
            let value = fields[k].value
            if (value !== null && !value.match(/^ *$/)) {
                res.push({[k]: value});
            }
        })
        return res
    }
}
