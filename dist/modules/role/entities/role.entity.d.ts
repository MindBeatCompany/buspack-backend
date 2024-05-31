import { AppmenuEntity } from 'src/modules/appmenu/entities/appmenu.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
export declare class RoleEntity {
    id: number;
    name: string;
    users: UserEntity[];
    appmenues: AppmenuEntity[];
    setUpperCase(): void;
}
