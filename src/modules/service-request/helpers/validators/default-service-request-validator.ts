
import { Injectable } from "@nestjs/common";

import ServiceRequestValidator from "./service-request-validator";
import { srFieldResponse } from "./sr-field-response";

@Injectable()
export default class DefaultServiceRequestValidator extends ServiceRequestValidator {

    protected async validateRowData(row: any, dtv: any, isFileUploading: boolean) {
        let requestId = this.validateAttributte(row.requestId.toString(), "string");

        // Recipient
        let recipientFullname = this.validateAttributte(row.recipientFullname, "string");
        let docType = this.validateAttributte(row.docType, "string");
        let docNumber = this.validateDocNumber(row.docNumber);
        let phone = this.validateAttributte(row.phone, "string", true);
        let email = this.validateAttributte(row.email, "string", true);

        let homeDelivery = this.validateAttributte(row.homeDelivery, "string");
        homeDelivery = this.validateHomeDelivery(homeDelivery);

        // Address
        let addressStreet = srFieldResponse(row.addressStreet, "ok", "")
        if (homeDelivery.status === "danger") {
          addressStreet = this.setError(addressStreet, this.getCantValidateAFOnHDErrorMsge());
        } else {
          const canBeEmpty = homeDelivery.value === "NO";
          addressStreet = this.validateAttributte(row.addressStreet, "string", canBeEmpty);
        }
        let addressNumber = this.validateAttributte(row.addressNumber, "number", true);
        let addressBuild = this.validateAttributte(row.addressBuilding, "string", true);
        let addressFloor = this.validateAttributte(row.addressFloor, "string", true);
        let addressApartment = this.validateAttributte(row.addressApartment, "string", true);
        let addressCpa = this.validateAttributte(row.addressCpa, "string", true);

        // Geo
        let enabledPlace = this.validateAttributte(row.enabledPlace, "string");

        /*
        
        
        try {
          console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
          const places = await this.enabledPlacesService.getEnabledPlacesSaitForValidator();
          console.log(places);
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          
          const placeExists = places.some(place => place === enabledPlace.value);
          if (!placeExists) {
            enabledPlace.error = "Localidad no habilitada en Sait, pedir Soporte.";
          }
      } catch (error) {
          console.error(error);
          throw new Error(`Error al validar el lugar "${enabledPlace.value}".`);
      }
      */

      
        
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
        }
    }

    private validateDocNumber(docNumber: any) {
      let res = srFieldResponse(docNumber, "ok", "");

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

      return res;
    }

    private validateHomeDelivery(homeDelivery: { value: any; status: string; error: string; }): { value: any; status: string; error: string; } {
      let value = homeDelivery.value;

      if (value.match(new RegExp("^si$", "i"))) {
        homeDelivery.value = "SI";
      } else if (value.match(new RegExp("^no$", "i"))) {
          homeDelivery.value = "NO";
      } else {
          homeDelivery = this.setError(homeDelivery, this.getHomeDeliveryErrorMsge());
      }

      return homeDelivery;
    }

    public validateAttributte(value: any, type: string, empty: boolean = false) {
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
        }

        if (typeof value !== type && type !== "string" && !empty) {
          attr.status = "danger";
          attr.error = `Este atributo debe ser ${mapTypes[type]}`;
        }
        return attr;
      }
}
