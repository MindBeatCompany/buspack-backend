import { MailerService } from "@nestjs-modules/mailer";
import { AccountRecoveryDto } from "../auth/dtos";
import { UserEntity } from "../user/entities/user.entity";
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserCredentials(user: UserEntity): Promise<void>;
    resendUserCredentials(user: UserEntity): Promise<void>;
    sendRecoveryPass(user: UserEntity, userAdmin: UserEntity): Promise<void>;
    sendWrongRecovery(user: AccountRecoveryDto, userAdmin: UserEntity): Promise<void>;
}
