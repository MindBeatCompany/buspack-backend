import { Repository } from "typeorm";
import { LocalityEntity } from "./entities/location.entity";
export declare class AssociatedZipcodeService {
    private readonly localityEntity;
    constructor(localityEntity: Repository<LocalityEntity>);
    getLocality(enabledPlace: string): Promise<LocalityEntity>;
    getEnabledPlacesLocal(fields: any): Promise<LocalityEntity[]>;
}
