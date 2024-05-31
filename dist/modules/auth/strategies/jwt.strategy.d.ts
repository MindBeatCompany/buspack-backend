import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../../user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userService;
    private config;
    constructor(userService: UserService, config: ConfigService);
    validate(payload: any): Promise<{
        roles: string;
        companyName: string;
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
        role: import("../../role/entities/role.entity").RoleEntity;
        account: import("../../account/entities/account.entity").AccountEntity;
        createdAt: Date;
        deletedAt: Date;
    }>;
}
export {};
