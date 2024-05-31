
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import AbstractEnabledPlaceFinder from "./abstract-enabled-place-finder";
import { LocalityEntity } from "src/modules/enabled-places/entities/location.entity";

@Injectable()
export default class DefaultEnabledPlaceFinder extends AbstractEnabledPlaceFinder {
    
    constructor(
        @InjectRepository(LocalityEntity)
        private localityRepository: Repository<LocalityEntity>
    ) {
        super();
    }

    public async find(data: any) {
        const enabledPlace = data.enabledPlace;
        const locality = data.locality;
        const cpa = data.cpa;
        const province = data.province;

        if (data.homeDelivery.value === "NO") {
            // si el lugar habilitado esta ok valido cpa
            if (enabledPlace.status == "ok" && cpa.status == "ok") {
              await this.localityRepository.find({
                where: {
                  enabled_place: enabledPlace.value,
                },
              }).then(place => {
                if (place.length == 0) {
                  enabledPlace.status = "danger";
                  enabledPlace.error = "Este lugar no esta actualmente habilitado";
      
                  locality.status = "danger";
                  locality.error = "La localidad no pertence a un lugar habilitado";
      
                  province.status = "danger";
                  province.error = "La provincia no pertence a un lugar habilitado";
      
                  cpa.status = "danger";
                  cpa.error = "El codigo Postal no pertence a un lugar habilitado";
      
                } else {
                  if (place[0].zip_code != cpa.value) {
                    cpa.status = "danger";
                    cpa.error = "El codigo Postal no pertence a un lugar habilitado";
                  }
                }
              });
            }
          } else {
            // Si es entrega a domicilio
            await this.localityRepository.find({
              where: {
                zip_code: data.addressCpa.value,
              },
            });
          }

        
        data.enabledPlace = enabledPlace;
        data.locality = locality;
        data.cpa = cpa;
        data.province = province;

        return data;
    }
}