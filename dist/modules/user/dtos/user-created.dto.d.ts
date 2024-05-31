import { AccountCreatedDto } from "src/modules/account/dtos";
import { RoleCreatedDto } from "src/modules/role/dtos";
export declare class UserCreatedDto {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    role: RoleCreatedDto;
    account: AccountCreatedDto;
    sessionTime: number;
    createdAt: Date;
}
