import { RolesBuilder } from "nest-access-control";
import { AppmenuService } from "./appmenu.service";
export declare class AppmenuController {
    private readonly appmenuService;
    private readonly rolesBuilder;
    constructor(appmenuService: AppmenuService, rolesBuilder: RolesBuilder);
}
