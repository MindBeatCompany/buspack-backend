import { HttpService } from "@nestjs/common";
import { Repository } from "typeorm";
import { EnabledPlaceEntity } from "./entities/enabled-places.entity";
import { ServicesSaitService } from "../services-sait/services-sait.service";
export declare class EnabledPlacesService {
    private readonly http;
    private readonly enabledPlaceRepository;
    private saitBaseUrl;
    private saitTokenApi;
    private readonly serviceSaitService;
    private enabledPlacesURL;
    constructor(http: HttpService, enabledPlaceRepository: Repository<EnabledPlaceEntity>, saitBaseUrl: string, saitTokenApi: string, serviceSaitService: ServicesSaitService);
    getEnabledPlacesSait(): Promise<void>;
    getEnabledPlacesSaitForValidator(): Promise<String[]>;
    private save;
    private mapperOut;
}
