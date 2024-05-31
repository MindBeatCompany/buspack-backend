
import { Injectable } from "@nestjs/common";

import ServiceRequestValidator from "./service-request-validator";
import { numberFields, stringFields } from "src/shared/datatype-fields";
import { srFieldResponse } from "./sr-field-response";

@Injectable()
export default class FormatServiceRequestValidator extends ServiceRequestValidator {

    protected validateRowData(row: any, dtv: any, isFileUploading) {
            const requestId = this.validateValue(row.requestId.toString(), "requestId", dtv, isFileUploading);

            // recipient
            const recipientFullname = this.validateValue(row.recipientFullname, "recipientFullname", dtv, isFileUploading);
            const docType = this.validateValue(row.docType, "docType", dtv, isFileUploading);
            const docNumber = this.validateDocNumber(row.docNumber, dtv, isFileUploading);
            const phone = this.validateValue(row.phone, "phone", dtv, isFileUploading);
            const email = this.validateValue(row.email, "email", dtv, isFileUploading);

            const homeDelivery = this.validateHomeDelivery("homeDelivery", row.homeDelivery, dtv, isFileUploading);

            let addressStreet = {};
            let addressNumber = {};
            let addressCpa = {};
            let addressBuild = {};
            let addressFloor = {};
            let addressApartment = {};

            // si hay errores en el homeDelivery, se setea en todos los campos de address con error
            // porque se necesita que este campo este ok para hacer la validación
            if (homeDelivery.status !== "ok") {
                [{k: "addressStreet", v: addressStreet},
                    {k: "addressNumber", v: addressNumber},
                    {k: "addressCpa", v: addressCpa},
                    {k: "addressBuilding", v: addressBuild},
                    {k: "addressFloor", v: addressFloor},
                    {k: "addressApartment", v: addressApartment}]
                    .map(af => { // af = addrField
                        // IV info to validate
                        const addressFieldIV = dtv.stringFields.concat(dtv.numberFields).find(sf => sf.fieldName === af.k);
                        if (addressFieldIV.position !== null || addressFieldIV.defaultValue !== null) {
                            af.v["status"] = "danger";
                            af.v["error"] = this.getCantValidateAFOnHDErrorMsge();
                            af.v["value"] = row[af["k"]] || addressFieldIV.defaultValue;
                        } else {
                            af.v["status"] = "ok";
                            af.v["error"] = "";
                            af.v["value"] = null;
                        }
                    })
            } else {
                if (homeDelivery.value === "NO") {
                    [{k: "addressStreet", v: addressStreet},
                    {k: "addressNumber", v: addressNumber},
                    {k: "addressCpa", v: addressCpa},
                    {k: "addressBuilding", v: addressBuild},
                    {k: "addressFloor", v: addressFloor},
                    {k: "addressApartment", v: addressApartment}]
                        .map(af => {
                            af.v["value"] = row[af.k];
                            af.v["error"] = "";
                            af.v["status"] = "ok";
                        })
                } else {
                    addressStreet = this.validateAddress(row.addressStreet, "addressStreet", dtv, isFileUploading);
                    addressNumber = this.validateAddress(row.addressNumber ?
                                                            row.addressNumber.toString() :
                                                            row.addressNumber, "addressNumber",
                                                        dtv,
                                                        isFileUploading);
                    addressCpa = this.validateAddress(row.addressCpa ?
                                                        row.addressCpa.toString() :
                                                        row.addressCpa,
                                                        "addressCpa",
                                                        dtv,
                                                        isFileUploading);

                    addressBuild = this.validateAddress(this.getAddressBuilding(row), "addressBuilding", dtv, isFileUploading);

                    addressFloor = this.validateAddress(row.addressFloor ?
                                                            row.addressFloor.toString() :
                                                            row.addressFloor,
                                                        "addressFloor",
                                                        dtv,
                                                        isFileUploading);

                    addressApartment = this.validateAddress(row.addressApartment ?
                                                                row.addressApartment.toString() :
                                                                row.addressApartment,
                                                            "addressApartment",
                                                            dtv,
                                                            isFileUploading);
                }
            }

            let locality, province, cpa, enabledPlace;

            if (isFileUploading) {
                locality = this.validateEPValue(row.locality, "locality", dtv);
                province = this.validateEPValue(row.province, "province", dtv);
                cpa = this.validateEPValue(row.cpa, "cpa", dtv);
                enabledPlace = srFieldResponse(row.cpa, "ok", "");

                let epDtv = dtv.stringFields.filter(ed => ed.fieldName === "locality" || ed.fieldName === "province" || ed.fieldName === "cpa")
                const epFieldsWithValueNull = this.getGetEpFieldsWithValueNull(locality, province, cpa, epDtv);

                if (epFieldsWithValueNull.length > 1) {
                    const epFieldsWithValueNullKeys = epFieldsWithValueNull.map(ef => Object.keys(ef)[0]);
                    epFieldsWithValueNullKeys.forEach(ef => {
                        // epFtv = enabled place field to validate
                        const epFtv = epDtv.find(ed => ed.fieldName === ef);
                        if (epFtv.position !== null) {
                            if (ef === "locality") {
                                locality.value =  "";
                                locality.status =  "danger";
                                locality.error =  this.getMustCompleteAtLeastTwoFieldsMsge();
                            }

                            if (ef === "province") {
                                province.value =  "";
                                province.status =  "danger";
                                province.error =  this.getMustCompleteAtLeastTwoFieldsMsge();    
                            }

                            if (ef === "cpa") {
                                cpa.value =  "";
                                cpa.status =  "danger";
                                cpa.error =  this.getMustCompleteAtLeastTwoFieldsMsge();    
                            }
                        }
                    })

                    enabledPlace.status = "danger";
                    enabledPlace.value = "";
                    enabledPlace.error = "Información insuficiente para obtener el lugar habilitado"
                }
            } else {
                locality = srFieldResponse(row.locality, "ok", "");
                province = srFieldResponse(row.province, "ok", "");
                cpa = srFieldResponse(row.cpa, "ok", "");
                enabledPlace = srFieldResponse(row.enabledPlace, "ok", "");
            }

            const qtyPieces = this.validateValue(row.qtyPieces, "qtyPieces", dtv, isFileUploading);
            const totalWeight = this.validateValue(row.totalWeight, "totalWeight", dtv, isFileUploading);
            const observations = this.validateValue(row.observations, "observations", dtv, isFileUploading);

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
            }
    }

    private getAddressBuilding(row: any): any {
        if (row.addressBuilding) {
            return row.addressBuilding.toString()
        } else if (row.addressBuild) {
            return row.addressBuild.toString()
        } else {
            return null;
        }
    }

    private getMustCompleteAtLeastTwoFieldsMsge(){ 
        return "Se deben completar al menos dos campos entre localidad, provincia y cpa para obtener el lugar habilitado";
    }

    private validateAddress(addressValue: any, fieldName: string, dtv: any, isFileUploading: boolean) {
        const addressNumberField = dtv.numberFields.find(nf => nf.fieldName === "addressNumber");
        const stringFields = dtv.stringFields.concat(addressNumberField);
        const addressField = stringFields.find(sf => sf.fieldName === fieldName);

        if (isFileUploading && addressField.defaultValue !== null) {
            let res = {};
            res["error"] = "";
            res["status"] = "ok";
            res["value"] = addressField.defaultValue

            return res;
        } else if (((typeof addressValue === "string" && addressValue.trim().length === 0) || addressValue == null)
                     && addressField.position !== null
                     && !this.getCanBeEmpty(fieldName)) {
            let res = {};
            res["error"] = this.getAttrCantBeEmptyErrMsge();
            res["status"] = "danger";
            res["value"] = "" 

            return res;
        } else {
            return this.validateValue(addressValue, fieldName, dtv, isFileUploading);
        }
        
    }

    private valueHasValidLength(value: any, fieldName: any, dtv: any) {
        let res = true;

        if (stringFields.includes(fieldName)) {
            const savedLength = dtv.stringFields.find(sf => sf.fieldName === fieldName).length;
            if (value.toString().length > savedLength) res = false;
        }

        return res;
    }

    private getDefaultValue(fieldName: string, dtv: any) {
        const allFields = dtv.stringFields.concat(dtv.numberFields).concat(dtv.booleanFields);
        return allFields.find(f => f.fieldName === fieldName).defaultValue;
    }

    private validateValue(value: any, fieldName: string,  dtv: any, isFileUploading: boolean) {
        let res = srFieldResponse(value, "ok", "");

        const defaultValue = this.getDefaultValue(fieldName, dtv);
        
        if (isFileUploading && defaultValue) {
            res.value = defaultValue;
            return res;
        }

        if ((value == null) && !this.getCanBeEmpty(fieldName) ) {
            return this.setError(res, this.getAttrCantBeEmptyErrMsge());
        }

        if (numberFields.includes(fieldName)) {
            if (typeof(value) === "string") {
                // replace commas per dots in order to cast to number
                value = value.replace(",", ".");
                return this.getCastedToNumOrError(value, res);
            }
        }

        if (value !== null && !this.valueHasValidLength(value, fieldName, dtv)) {
            return this.setError(res, "Este atributo supera el ancho máximo permitido");
        }

        return res;
    }

    private validateHomeDelivery(fieldName: string, value: string, dtv: any, isFileUploading: boolean) {
        let res = srFieldResponse(value, "ok", "");

        const defaultValue = this.getDefaultValue(fieldName, dtv);
        if (isFileUploading && defaultValue != undefined) {
            res.value = defaultValue ? "SI" : "NO";
            return res;
        }

        if (typeof value === "string") value = value.trim();

        if (value === null || value === "") return this.setError(res, "Este atributo no puede ser vacío");

        if (typeof value !== "number" && value.match(new RegExp("^si$", "i"))) {
            res.value = "SI";
        } else if (typeof value !== "number" && value.match(new RegExp("^no$", "i"))) {
            res.value = "NO";
        } else {
            res = this.setError(res, "El valor de envio a domicilio debe tener los valores 'SI' o 'NO',\
                                      indistintamente en mayúscula o minúscula. Ejemplo: 'Si', 'si', 'NO' son valores válidos, 'sii' no es un valor válido");
        }

        return res;
    }

    private validateDocNumber(docNumber, dtv, isFileUploading: boolean) {
        let res = srFieldResponse(docNumber, "ok", "");

        const defaultValue = this.getDefaultValue("docNumber", dtv);

        if (isFileUploading && defaultValue) {
            res.value = Number(defaultValue);
            return res;
        }

        if ((docNumber == null || docNumber == "") && !this.getCanBeEmpty("docNumber")) {
            res.status = "danger";
            res.error = "Este atributo no puede ser vacio";
            res.value = "";

            return res;
        }

        if (typeof(docNumber) === "string") {
            docNumber = docNumber.replace(/(\.|,)/g,'');
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

        return srFieldResponse(docNumber, "ok", "");
    }


    private validateEPValue(value: any, fieldName: string, dtv: any) {
        let res = srFieldResponse(value, "ok", "");

        const defaultValue = this.getDefaultValue(fieldName, dtv);
        if (defaultValue) {
            res.value = defaultValue;
            return res;
        }

        if (value == null) {
            return res;
        } else {
            value = String(value).trim();
            if (value.length === 0) {
                res.value = null;
                return res;
            } else {
                if (!this.valueHasValidLength(value, fieldName, dtv)) {
                    return this.setError(res, "Este atributo supera el ancho máximo permitido");
                } else {
                    res.value = value
                    return res;
                }
            }
        }
    }

    private getGetEpFieldsWithValueNull(locality: { value: any; status: string; error: string; }, 
                                        province: { value: any; status: string; error: string; }, 
                                        cpa: { value: any; status: string; error: string; },
                                        epDtv) {

        let res = [];

        const localityField = epDtv.find(ed => ed.fieldName === "locality")
        if (locality.value === null && (localityField.position !== null || localityField.defaultValue === null)) {
            res.push({"locality": locality});
        }

        const provinceField = epDtv.find(ed => ed.fieldName === "province")
        if (province.value === null && (provinceField.position !== null || provinceField.defaultValue === null)) {
            res.push({"province": province});
        }

        const cpaField = epDtv.find(ed => ed.fieldName === "cpa")
        if (cpa.value === null && (cpaField.position !== null || cpaField.defaultValue === null)) {
            res.push({"cpa": cpa});
        }

        return res;
    }
}
