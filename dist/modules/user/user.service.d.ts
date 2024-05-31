/// <reference types="multer" />
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { CrudOperations } from "../../shared/interfaces/crud-operations.interface";
import { UpdatePreferenceDto, UpdateUserDto, PreferenceUserDto, CreateUserDto, UpdateStatusUserDto, CreateMultiUserDto, UserCreatedDto, PassResetDto } from "./dtos";
import { RoleEntity } from "../role/entities/role.entity";
import { UserLoggedDto } from "../auth/dtos/user-logged.dto";
import { AccountEntity } from "../account/entities/account.entity";
import { MailService } from "../mail/mail.service";
import { TariffEntity } from "./entities";
export declare class UserService implements CrudOperations {
    private userRepository;
    private rolRepository;
    private accountRepository;
    private readonly mailService;
    private tariffRepository;
    constructor(userRepository: Repository<UserEntity>, rolRepository: Repository<RoleEntity>, accountRepository: Repository<AccountEntity>, mailService: MailService, tariffRepository: Repository<TariffEntity>);
    findOne(id: number, userLogged?: UserLoggedDto): Promise<UserEntity>;
    findAuthUser(userName: string): Promise<UserEntity>;
    findAll(userLogged?: UserLoggedDto): Promise<UserCreatedDto[]>;
    findAllAdmins(user: UserEntity): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity>;
    create(newUser: CreateUserDto, userLogged: UserLoggedDto): Promise<UserEntity>;
    updateTariff(file: Express.Multer.File, accountId: number): Promise<void>;
    createMultiAcounts(users: CreateMultiUserDto, file: Express.Multer.File): Promise<UserCreatedDto[]>;
    createCorporateUsers(users: CreateMultiUserDto): Promise<UserCreatedDto[]>;
    update(id: number, newValue: UpdateUserDto, userLogged?: UserLoggedDto): Promise<UserEntity>;
    delete(id: number, userLogged: UserLoggedDto): Promise<UserCreatedDto>;
    addRole(idUser: number, idsRole: number[]): Promise<UserEntity>;
    getUserPreferences(id: number, userLogged?: UserLoggedDto): Promise<PreferenceUserDto>;
    updateUserPreferences(id: number, body: UpdatePreferenceDto, userLogged?: UserLoggedDto): Promise<PreferenceUserDto>;
    setStatus(body: UpdateStatusUserDto, userLogged: UserLoggedDto): Promise<UserCreatedDto[]>;
    updateUserPass(user: UserEntity, newPass: string, firstTimeLogged: boolean): Promise<UserEntity>;
    setSessionCounter(id: number, wrong: boolean): Promise<number>;
    blockUser(id: number): Promise<UserEntity>;
    userPasswordReset(body: PassResetDto): Promise<UserEntity[]>;
    private validateFile;
    private findDuplicateUsers;
    private findDuplicate;
    validateBody(body: any): Promise<CreateMultiUserDto>;
    downloadFile(accountId: number): Promise<{
        root: string;
        file: string;
    }>;
}
