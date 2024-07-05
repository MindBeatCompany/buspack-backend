"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const service_request_validator_1 = require("./service-request-validator");
const sr_field_response_1 = require("./sr-field-response");
let DefaultServiceRequestValidator = class DefaultServiceRequestValidator extends service_request_validator_1.default {
    validateRowData(row, dtv, isFileUploading) {
        let requestId = this.validateAttributte(row.requestId.toString(), "string");
        let recipientFullname = this.validateAttributte(row.recipientFullname, "string");
        let docType = this.validateAttributte(row.docType, "string");
        let docNumber = this.validateDocNumber(row.docNumber);
        let phone = this.validateAttributte(row.phone, "string", true);
        let email = this.validateAttributte(row.email, "string", true);
        let homeDelivery = this.validateAttributte(row.homeDelivery, "string");
        homeDelivery = this.validateHomeDelivery(homeDelivery);
        let addressStreet = sr_field_response_1.srFieldResponse(row.addressStreet, "ok", "");
        if (homeDelivery.status === "danger") {
            addressStreet = this.setError(addressStreet, this.getCantValidateAFOnHDErrorMsge());
        }
        else {
            const canBeEmpty = homeDelivery.value === "NO";
            addressStreet = this.validateAttributte(row.addressStreet, "string", canBeEmpty);
        }
        let addressNumber = this.validateAttributte(row.addressNumber, "number", true);
        let addressBuild = this.validateAttributte(row.addressBuilding, "string", true);
        let addressFloor = this.validateAttributte(row.addressFloor, "string", true);
        let addressApartment = this.validateAttributte(row.addressApartment, "string", true);
        let addressCpa = this.validateAttributte(row.addressCpa, "string", true);
        let enabledPlace = this.validateAttributte(row.enabledPlace, "string");
        let locality = this.validateAttributte(row.locality, "string");
        let province = this.validateAttributte(row.province, "string");
        let cpa = this.validateAttributte(row.cpa.toString(), "string");
        let qtyPieces = this.validateAttributte(row.qtyPieces, "number");
        let totalWeight = this.validateAttributte(row.totalWeight, "number");
        let observations = this.validateAttributte(row.observations, "string", true);
        return {
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
        };
    }
    validateDocNumber(docNumber) {
        let res = sr_field_response_1.srFieldResponse(docNumber, "ok", "");
        if ((docNumber == null || docNumber == "") && !this.getCanBeEmpty("docNumber")) {
            res.status = "danger";
            res.error = "Este atributo no puede ser vacio";
            res.value = "";
            return res;
        }
        if (typeof (docNumber) === "string") {
            docNumber = docNumber.replace(/(\.|,)/g, '');
            res = this.getCastedToNumOrError(docNumber, res);
            if (res.status === "danger") {
                return res;
            }
        }
        if (String(docNumber).length > 10) {
            res.status = "danger";
            res.error = "SAIT no soporta DNIs/pasaportes mayores a 10 dígitos";
            return res;
        }
        return res;
    }
    validateHomeDelivery(homeDelivery) {
        let value = homeDelivery.value;
        if (value.match(new RegExp("^si$", "i"))) {
            homeDelivery.value = "SI";
        }
        else if (value.match(new RegExp("^no$", "i"))) {
            homeDelivery.value = "NO";
        }
        else {
            homeDelivery = this.setError(homeDelivery, this.getHomeDeliveryErrorMsge());
        }
        return homeDelivery;
    }
    validateAttributte(value, type, empty = false) {
        let error = "";
        let status = "ok";
        const attr = { value: value, status: status, error: error };
        if (value == undefined || value === "") {
            value = "";
            if (!empty) {
                attr.error = "Este atributo no puede ser vacio";
                attr.status = "danger";
                attr.value = value;
                return attr;
            }
        }
        const mapTypes = {
            string: 'texto',
            number: 'número'
        };
        if (typeof value !== type && type !== "string" && !empty) {
            attr.status = "danger";
            attr.error = `Este atributo debe ser ${mapTypes[type]}`;
        }
        return attr;
    }
};
DefaultServiceRequestValidator = __decorate([
    common_1.Injectable()
], DefaultServiceRequestValidator);
exports.default = DefaultServiceRequestValidator;
//# sourceMappingURL=default-service-request-validator.js.map