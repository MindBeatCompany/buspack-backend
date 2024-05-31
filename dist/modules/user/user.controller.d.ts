/// <reference types="multer" />
import { RolesBuilder } from "nest-access-control";
import { UpdateUserDto, PreferenceUserDto, UpdatePreferenceDto, UpdateStatusUserDto, UserCreatedDto, CreateUserDto, CreateMultiUserDto, PassResetDto } from "./dtos";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly userService;
    private readonly rolesBuilder;
    constructor(userService: UserService, rolesBuilder: RolesBuilder);
    getAllUser(res: any): Promise<UserCreatedDto[]>;
    getOneUser(id: string, res: any): Promise<UserEntity>;
    updateTariff(accountId: number, res: any, file: Express.Multer.File): Promise<any>;
    passwordReset(res: any, body: PassResetDto): Promise<CreateUserDto[]>;
    updateUser(id: string, body: UpdateUserDto, res: any): Promise<UserCreatedDto>;
    updatePreferences(id: string, body: UpdatePreferenceDto, res: any): Promise<PreferenceUserDto>;
    setUserStatus(res: any, body: UpdateStatusUserDto): Promise<UserCreatedDto[]>;
    getPreferences(id: string, res: any): Promise<PreferenceUserDto>;
    deleteUser(res: any, id: string): Promise<any>;
    createMultiAcounts(res: any, bodyRaw: any, file: Express.Multer.File): Promise<CreateMultiUserDto>;
    createCorporateUsers(res: any, body: any): Promise<CreateMultiUserDto>;
    downloadTariff(accountId: number, res: any): Promise<any>;
}
