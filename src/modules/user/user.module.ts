import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity, TariffEntity } from "./entities";
import { RoleEntity } from "../role/entities/role.entity";
import { AccountEntity } from "../account/entities/account.entity";
import { MailModule } from "../mail/mail.module";
import { MailService } from "../mail/mail.service";

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([
      TariffEntity,
      UserEntity,
      RoleEntity,
      AccountEntity,
    ]),
  ],
  providers: [UserService, MailService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
