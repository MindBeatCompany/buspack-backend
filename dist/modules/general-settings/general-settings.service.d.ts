import { Repository } from "typeorm";
import { GeneralSettingsEntity } from "./entities/general-settings.entity";
export declare class GeneralSettingsService {
    private readonly generalSettingsRepository;
    private generalId;
    constructor(generalSettingsRepository: Repository<GeneralSettingsEntity>);
    findById(): Promise<GeneralSettingsEntity>;
    create(entity: GeneralSettingsEntity, options?: Object): Promise<GeneralSettingsEntity>;
    update(newValue: GeneralSettingsEntity): Promise<GeneralSettingsEntity>;
    delete(id: number): Promise<void | GeneralSettingsEntity>;
}
