import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { LoginDto, RegisterDto, UserLoggedDto, UpdatePasswordDto, AccountRecoveryDto } from "./dtos";
import { UserEntity } from "../user/entities/user.entity";
import { RoleService } from "../role/role.service";
import { AccountService } from "../account/account.service";
import { MailService } from "../mail/mail.service";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly roleService;
    private readonly accountService;
    private readonly mailService;
    constructor(usersService: UserService, jwtService: JwtService, roleService: RoleService, accountService: AccountService, mailService: MailService);
    validateUser(payload: LoginDto): Promise<UserLoggedDto>;
    createToken(user: UserEntity): Promise<UserLoggedDto>;
    newUser(body: RegisterDto): Promise<void>;
    changePass(body: UpdatePasswordDto, userLogged: UserLoggedDto): Promise<UserLoggedDto>;
    recovery(body: AccountRecoveryDto): Promise<{
        message: string;
        object: Object;
    }>;
    private sendNotify;
}
