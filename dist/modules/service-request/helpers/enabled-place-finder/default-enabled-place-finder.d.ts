import { Repository } from "typeorm";
import AbstractEnabledPlaceFinder from "./abstract-enabled-place-finder";
import { LocalityEntity } from "src/modules/enabled-places/entities/location.entity";
export default class DefaultEnabledPlaceFinder extends AbstractEnabledPlaceFinder {
    private localityRepository;
    constructor(localityRepository: Repository<LocalityEntity>);
    find(data: any): Promise<any>;
}
