import { AccountCreatedDto } from "src/modules/account/dtos";
export declare class UserLoggedDto {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    firstTimeLogged: boolean;
    sessionTime: number;
    createdAt: Date;
    companyName: string;
    codeECO: string;
    account: AccountCreatedDto;
    roles: string;
    token: string;
}
