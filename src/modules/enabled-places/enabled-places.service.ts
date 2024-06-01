import { HttpService, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProviderConstant } from "src/shared/config/provider.constant";
import messages from "src/shared/config/strings-constants";
import { Repository } from "typeorm";
import { EnabledPlacesResponseDTO } from "./dtos/enabled-places-response.dto";
import { EnabledPlaceEntity } from "./entities/enabled-places.entity";
import { EnabledPlaces } from "./model/enabled-places";
import { ServicesSaitService } from "../services-sait/services-sait.service";

@Injectable()
export class EnabledPlacesService {
  private enabledPlacesURL = `/sait/destinosHabilitados?token=`;
  constructor(
    private readonly http: HttpService,
    @InjectRepository(EnabledPlaceEntity)
    private readonly enabledPlaceRepository: Repository<EnabledPlaceEntity>,
    @Inject(ProviderConstant.SAIT_BASE_URL) private saitBaseUrl: string,
    @Inject(ProviderConstant.SAIT_TOKEN_API) private saitTokenApi: string,
    private readonly serviceSaitService: ServicesSaitService
  ) {}

 

  async getEnabledPlacesSait(): Promise<void> {
    let token = await this.serviceSaitService.saitAccessToken();
    return this.http
      .get(`${this.saitBaseUrl}${this.enabledPlacesURL}${token.token}`)
      .toPromise()
      .then((data) => {
        if (data.status === 201) {
          if (Array.isArray(data.data.registros)) {
            return data.data.registros
              .map((location) => this.mapperOut(location))
              .filter((location) => location);
          }
        }
        return [];
      })
      .then((locations) => {
        return this.save(locations);
      })
      .catch((error) => {
        console.error(error);
        throw new Error(messages.enabledPlace);
      });
  }

  async getEnabledPlacesSaitForValidator(): Promise<String[]> {

      try {
          let token = await this.serviceSaitService.saitAccessToken();
          const data = await this.http
              .get(`${this.saitBaseUrl}${this.enabledPlacesURL}${token.token}`)
              .toPromise();
  
          if (data.status === 201 && Array.isArray(data.data.registros)) {
              return data.data.registros.map((location: any) => this.mapperOut(location));
          } else {
              return [];
          }
      } catch (error) {
          console.error(error);
          throw new Error(messages.enabledPlace);
      }
  }

  private async save(locations: EnabledPlacesResponseDTO[]): Promise<void> {
    await this.enabledPlaceRepository.clear();
    for (let index = 0; index < locations.length; index++) {
      const newLocation = this.enabledPlaceRepository.create(locations[index]);
      await this.enabledPlaceRepository.save(newLocation);
    }
  }

  private mapperOut(location: EnabledPlaces): EnabledPlacesResponseDTO {
    if (location.Activo === "1") {
      return {
        idog: location.IDOG,
        isActive: location.Activo,
        code: location.Codigo,
        place_name: location.Nombre,
        type_description: location.DescTipo,
        locality_name: location.Localidad,
        province_name: location.Provincia,
      };
    }
    return null;
  }
}
