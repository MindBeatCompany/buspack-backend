import { AssociatedZipcodeService } from "./associated-zipcode.service";
import { EnabledPlacesService } from "./enabled-places.service";
export declare class EnabledPlacesController {
    private readonly enabledPlacesService;
    private readonly associatedZipCodeSevice;
    constructor(enabledPlacesService: EnabledPlacesService, associatedZipCodeSevice: AssociatedZipcodeService);
    getLocalityByAssociatedZipCode(enabledPlace: string, res: any): Promise<void>;
    getEnabledPlacesLocal(res: any): Promise<void>;
    getEnabledPlacesSait(res: any): Promise<void>;
}
