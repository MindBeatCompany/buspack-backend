import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import messages from "src/shared/config/strings-constants";
import { Repository } from "typeorm";
import { AssociatedZipCodeEntity } from "./entities/associated-zipcode.entity";
import { LocalityEntity } from "./entities/location.entity";
import { EnabledPlaceEntity } from "./entities/enabled-places.entity";

@Injectable()
export class AssociatedZipcodeService {
  constructor(
    @InjectRepository(LocalityEntity)
    private readonly localityEntity: Repository<LocalityEntity>,
    @InjectRepository(EnabledPlaceEntity)
    private readonly enabledPlaceRepository: Repository<EnabledPlaceEntity>,
  ) {}

  async getLocality(enabledPlace: string): Promise<LocalityEntity> {
    
    const locality = await this.localityEntity.findOne({
      enabled_place: enabledPlace,
    });
    if (!locality) {
      return Promise.reject(new Error(messages.localityError));
    }
    return Promise.resolve(locality);
  }

  async getEnabledPlacesLocal(fields) {
    try{ 
    const locality = await this.localityEntity.find(
    { 
      select: [...fields],
      where: {"isActive": true}
    }
    )
    return locality;
    }catch (error) {
        throw new Error(error);
    }
  }

  async getEnabledPlacesLocalActive(fields): Promise<LocalityEntity[]> {
    try {
      // Validar que fields sea un array de strings
      if (!Array.isArray(fields) || !fields.every(field => typeof field === 'string')) {
        throw new Error('Invalid fields parameter. It must be an array of strings.');
      }

      // Obtener los enabled places que están activos
      const enabledPlaces = await this.enabledPlaceRepository.find({
        select: ['place_name'],
        where: { isActive: "1" },
      });

      console.log("ENABLEDplaces: ")
      console.log(enabledPlaces)

      // Extraer los nombres de los enabled places activos
      const place_name = enabledPlaces.map(place => place.place_name);

      // Realizar el join y la consulta en LocalityEntity
      const localities = await this.localityEntity.createQueryBuilder('locality')
        .select(fields.map(field => `locality.${field}`))
        .where('locality.enabled_place IN (:...place_name)', { place_name })
        .getMany();

      return localities;
    } catch (error) {
      throw new Error(`Failed to get enabled places: ${error.message}`);
    }
  }

}
