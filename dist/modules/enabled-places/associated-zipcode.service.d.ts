import { Repository } from "typeorm";
import { LocalityEntity } from "./entities/location.entity";
import { EnabledPlaceEntity } from "./entities/enabled-places.entity";
export declare class AssociatedZipcodeService {
    private readonly localityEntity;
    private readonly enabledPlaceRepository;
    constructor(localityEntity: Repository<LocalityEntity>, enabledPlaceRepository: Repository<EnabledPlaceEntity>);
    getLocality(enabledPlace: string): Promise<LocalityEntity>;
    getEnabledPlacesLocal(fields: any): Promise<LocalityEntity[]>;
    getEnabledPlacesLocalActive(fields: any): Promise<LocalityEntity[]>;
}
