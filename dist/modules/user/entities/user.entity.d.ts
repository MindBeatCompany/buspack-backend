import { AccountEntity } from "../../account/entities/account.entity";
import { RoleEntity } from "src/modules/role/entities/role.entity";
export declare class UserEntity {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isActive: boolean;
    firstTimeLogged: boolean;
    wrongSessionCounter: number;
    sessionTime: number;
    role: RoleEntity;
    account: AccountEntity;
    createdAt: Date;
    deletedAt: Date;
    hashPassword(): Promise<void>;
}
