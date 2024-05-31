import { CrudOperations } from "src/shared/interfaces/crud-operations.interface";
import { Repository } from "typeorm";
import { UserLoggedDto } from "../auth/dtos";
import { CreateRolDto } from "./dtos/create-rol.dto";
import { UdpdateRolDto } from "./dtos/udpdate-rol.dto";
import { RoleEntity } from "./entities/role.entity";
export declare class RoleService implements CrudOperations {
    private readonly roleRepository;
    constructor(roleRepository: Repository<RoleEntity>);
    findAll(user: UserLoggedDto): Promise<RoleEntity[]>;
    findById(id: number): Promise<RoleEntity>;
    findOne(options?: Object, options2?: Object): Promise<RoleEntity>;
    create(entity: CreateRolDto, options?: Object): Promise<RoleEntity>;
    update(id: number, newValue: UdpdateRolDto): Promise<RoleEntity>;
    delete(id: number): Promise<Object>;
}
