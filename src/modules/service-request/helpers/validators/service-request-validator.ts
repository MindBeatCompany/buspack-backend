
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { AccountEntity } from "src/modules/account/entities/account.entity";
import { TariffEntity } from "src/modules/user/entities";
import { EnabledPlacesService } from "src/modules/enabled-places/enabled-places.service";
import  canBeEmptyFields  from "../../shared/can-be-empty-fields";


@Injectable()
export default abstract class ServiceRequestValidator {

    constructor(
        @InjectRepository(TariffEntity)
        private readonly tariffRepository: Repository<TariffEntity>,
        public readonly enabledPlacesService: EnabledPlacesService,
    ) { }
    public async validate(rawData: any[],
                          account: AccountEntity,
                          dtv: any = null,
                          isFileUploading) {
        
        const response: any[] = [];
        await Promise.all(rawData.map(async (row: any) => {
            let requestId = row.requestId;

            if (requestId !== undefined && requestId !== null) {
                const validatedData = this.validateRowData(row, dtv, isFileUploading);
                const {
                    requestId,
                    recipientFullname,
                    docType,
                    docNumber,
                    phone,
                    email,
                    addressApartment,
                    addressBuild,
                    addressCpa,
                    addressNumber,
                    addressFloor,
                    addressStreet,
                    enabledPlace,
                    locality,
                    province,
                    cpa,
                    qtyPieces,
                    totalWeight,
                    observations,
                    homeDelivery
                } = validatedData;

                if (totalWeight.status === "ok" && qtyPieces.status === "ok") {
                    await this.tariffRepository.find({
                      where: {
                        account: account,
                        weightFrom: LessThanOrEqual(totalWeight.value / qtyPieces.value),
                        weightTo: MoreThanOrEqual(totalWeight.value / qtyPieces.value)
                      },
                    }).then(tariff => {
                      if (tariff.length == 0) {
                        console.log("No existe peso: ", totalWeight.value / qtyPieces.value);
                        totalWeight.error = "Error en Tarifario, consultar area Comercial";
                        totalWeight.status = "danger";
                      }

                    });
                }            

                console.log(enabledPlace.value)
                console.log("JOJOJOJOJOJJOJOJOJOJOJOJOJOJOJOJOJOJOJOJOJOJOJOJOJO")

                response.push({
                    requestId,
                    recipientFullname,
                    docType,
                    docNumber,
                    phone,
                    email,
                    addressStreet,
                    addressNumber,
                    addressBuild,
                    addressFloor,
                    addressApartment,
                    addressCpa,
                    enabledPlace,
                    locality,
                    province,
                    cpa,
                    qtyPieces,
                    totalWeight,
                    homeDelivery,
                    observations})
            } else {
                throw new Error("Hay filas que no tienen identificación.");
            }

        }));

        return response;
    }

    protected abstract validateRowData(row: any, dtv: any, isFileUploading: boolean): any;

    protected getAttrCantBeEmptyErrMsge(): string {
        return "Este atributo no puede ser vacío";
    }

    protected setError(response: { value: any; status: string; error: string; }, error: string) {
        response.error = error;
        response.status = "danger";

        return response;
    }

    protected getHomeDeliveryErrorMsge(): string {
        return "El valor de envio a domicilio debe tener los valores 'SI' o 'NO',\
                 indistintamente en mayúscula o minúscula. Ejemplo: 'Si', 'si', 'NO'\
                 son valores válidos, 'sii' no es un valor válido";
    }

    // hd = home delivery
    // af = address field
    protected getCantValidateAFOnHDErrorMsge(): string {
        return "No se puede validar el campo si el valor del envío a domicilio es erróneo";
    }

    protected getCastedToNumOrError(value, srFieldResponse: { value: any; status: string; error: string; }) {
        const vctn = Number(value);

        if (Object.is(vctn, NaN)) {
            srFieldResponse = this.setError(srFieldResponse, "Este atributo debe ser de tipo numérico");
            srFieldResponse.value = value;
            return srFieldResponse;
        } else {
            srFieldResponse.value = vctn;
            return srFieldResponse;
        }
    }

    protected getCanBeEmpty(fieldName: string): boolean {
        return canBeEmptyFields.includes(fieldName);
    }
}
