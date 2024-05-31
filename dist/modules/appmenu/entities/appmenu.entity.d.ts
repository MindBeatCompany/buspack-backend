import { RoleEntity } from 'src/modules/role/entities/role.entity';
export declare class AppmenuEntity {
    id: number;
    name: string;
    menuParent: AppmenuEntity;
    url: string;
    roles: RoleEntity[];
    setUpperCase(): void;
}
