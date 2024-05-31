import { RoleCreatedDto, CreateRolDto } from "./dtos";
import { RoleEntity } from "./entities/role.entity";
import { RoleService } from "./role.service";
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    getAllRoles(res: any): Promise<RoleCreatedDto[]>;
    getOneRole(res: any, id: string): Promise<RoleCreatedDto>;
    createRole(res: any, body: CreateRolDto): Promise<RoleEntity>;
}
