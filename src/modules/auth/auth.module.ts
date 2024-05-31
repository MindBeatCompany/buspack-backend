import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UserModule } from "../user/user.module";
import { JWT_SECRET, EXPIRE_TOKEN_IN } from "src/shared/config/constants";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy, LocalStrategy } from "./strategies";
import { RoleModule } from "../role/role.module";
import { AccountModule } from "../account/account.module";
import { MailService } from "../mail/mail.service";
import { MailModule } from "../mail/mail.module";
@Module({
  imports: [
    MailModule,
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (consfig: ConfigService) => ({
        secret: consfig.get<string>(JWT_SECRET),
        signOptions: { expiresIn: consfig.get<string>(EXPIRE_TOKEN_IN) },
      }),
    }),
    UserModule,
    RoleModule,
    AccountModule,
    MailService,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
