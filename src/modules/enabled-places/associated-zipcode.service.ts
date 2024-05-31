import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import messages from "src/shared/config/strings-constants";
import { Repository } from "typeorm";
import { AssociatedZipCodeEntity } from "./entities/associated-zipcode.entity";
import { LocalityEntity } from "./entities/location.entity";

@Injectable()
export class AssociatedZipcodeService {
  constructor(
    @InjectRepository(LocalityEntity)
    private readonly localityEntity: Repository<LocalityEntity>
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
}
