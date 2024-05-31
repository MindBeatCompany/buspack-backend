import { CreateGeneralSettingsDTO } from "./dtos/create-general-settings.dto";
import { UpdateGeneralSettingsDTO } from "./dtos/update-general-settings.dto";
import { GeneralSettingsEntity } from "./entities/general-settings.entity";
import { GeneralSettingsService } from "./general-settings.service";
export declare class GeneralSettingsController {
    private readonly generalSettingsService;
    constructor(generalSettingsService: GeneralSettingsService);
    getSettings(res: any): Promise<GeneralSettingsEntity>;
    createSettings(res: any, body: CreateGeneralSettingsDTO): Promise<GeneralSettingsEntity>;
    uploadSettings(res: any, body: UpdateGeneralSettingsDTO): Promise<GeneralSettingsEntity>;
}
