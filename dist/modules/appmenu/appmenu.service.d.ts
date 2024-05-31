import { CrudOperations } from 'src/shared/interfaces/crud-operations.interface';
import { Repository } from 'typeorm';
import { AppmenuEntity } from './entities/appmenu.entity';
import { CreateAppMenuDto } from './dtos';
import { RoleEntity } from '../role/entities/role.entity';
export declare class AppmenuService implements CrudOperations {
    private appmenuRepository;
    private rolRepository;
    constructor(appmenuRepository: Repository<AppmenuEntity>, rolRepository: Repository<RoleEntity>);
    findAll(role?: string): Promise<AppmenuEntity[]>;
    findById(id: number): Promise<Object>;
    findOne(options?: Object, options2?: Object): Promise<Object>;
    create(menu: CreateAppMenuDto, options?: Object): Promise<AppmenuEntity>;
    update(id: number, newValue: Object): Promise<Object>;
    delete(id: number): Promise<void>;
}
