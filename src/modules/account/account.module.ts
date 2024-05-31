import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { AccountEntity } from "./entities/account.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, UserEntity])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
