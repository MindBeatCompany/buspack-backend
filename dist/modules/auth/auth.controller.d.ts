import { UserEntity } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";
import { AccountRecoveryDto, LoginDto, RegisterDto, UpdatePasswordDto, UserLoggedDto } from "./dtos";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto, res: any): Promise<UserLoggedDto>;
    register(body: RegisterDto, res: any): Promise<UserEntity>;
    updatePass(res: any, body: UpdatePasswordDto): Promise<UserLoggedDto>;
    accountRecovery(res: any, body: AccountRecoveryDto): Promise<any>;
}
