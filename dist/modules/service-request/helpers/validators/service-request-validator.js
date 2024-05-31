"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const account_entity_1 = require("../../../account/entities/account.entity");
const entities_1 = require("../../../user/entities");
const can_be_empty_fields_1 = require("../../shared/can-be-empty-fields");
let ServiceRequestValidator = class ServiceRequestValidator {
    constructor(tariffRepository) {
        this.tariffRepository = tariffRepository;
    }
    async validate(rawData, account, dtv = null, isFileUploading) {
        const response = [];
        await Promise.all(rawData.map(async (row) => {
            let requestId = row.requestId;
            if (requestId !== undefined && requestId !== null) {
                const validatedData = this.validateRowData(row, dtv, isFileUploading);
                const { requestId, recipientFullname, docType, docNumber, phone, email, addressApartment, addressBuild, addressCpa, addressNumber, addressFloor, addressStreet, enabledPlace, locality, province, cpa, qtyPieces, totalWeight, observations, homeDelivery } = validatedData;
                if (totalWeight.status === "ok" && qtyPieces.status === "ok") {
                    await this.tariffRepository.find({
                        where: {
                            account: account,
                            weightFrom: typeorm_2.LessThanOrEqual(totalWeight.value / qtyPieces.value),
                            weightTo: typeorm_2.MoreThanOrEqual(totalWeight.value / qtyPieces.value)
                        },
                    }).then(tariff => {
                        if (tariff.length == 0) {
                            console.log("No existe peso: ", totalWeight.value / qtyPieces.value);
                            totalWeight.error = "Error en Tarifario, consultar area Comercial";
                            totalWeight.status = "danger";
                        }
                    });
                }
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
                    observations
                });
            }
            else {
                throw new Error("Hay filas que no tienen identificación.");
            }
        }));
        return response;
    }
    getAttrCantBeEmptyErrMsge() {
        return "Este atributo no puede ser vacío";
    }
    setError(response, error) {
        response.error = error;
        response.status = "danger";
        return response;
    }
    getHomeDeliveryErrorMsge() {
        return "El valor de envio a domicilio debe tener los valores 'SI' o 'NO',\
                 indistintamente en mayúscula o minúscula. Ejemplo: 'Si', 'si', 'NO'\
                 son valores válidos, 'sii' no es un valor válido";
    }
    getCantValidateAFOnHDErrorMsge() {
        return "No se puede validar el campo si el valor del envío a domicilio es erróneo";
    }
    getCastedToNumOrError(value, srFieldResponse) {
        const vctn = Number(value);
        if (Object.is(vctn, NaN)) {
            srFieldResponse = this.setError(srFieldResponse, "Este atributo debe ser de tipo numérico");
            srFieldResponse.value = value;
            return srFieldResponse;
        }
        else {
            srFieldResponse.value = vctn;
            return srFieldResponse;
        }
    }
    getCanBeEmpty(fieldName) {
        return can_be_empty_fields_1.default.includes(fieldName);
    }
};
ServiceRequestValidator = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(entities_1.TariffEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceRequestValidator);
exports.default = ServiceRequestValidator;
//# sourceMappingURL=service-request-validator.js.map