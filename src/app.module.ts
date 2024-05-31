import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AccessControlModule } from "nest-access-control";
import { roles } from "./shared/config/app.roles";
import { AppmenuModule } from "./modules/appmenu/appmenu.module";
import { RoleModule } from "./modules/role/role.module";
import { TYPEORM_CONFIG } from "./shared/config/constants";
import { ServiceRequestModule } from "./modules/service-request/service-request.module";
import { AccountModule } from "./modules/account/account.module";
import { MailModule } from "./modules/mail/mail.module";
import { PrintLabelsModule } from './modules/print-labels/print-labels.module';
import { GeneralSettingsModule } from './modules/general-settings/general-settings.module';
import { ServicesSaitModule} from "./modules/services-sait/services-sait.module";
import { EnabledPlacesModule } from './modules/enabled-places/enabled-places.module';
import databaseConfig from "./shared/config/database.config";
import { ScheduleModule } from '@nestjs/schedule';
import { PricingModule } from "./modules/pricing/pricing.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
      envFilePath: ".env",
    }),
    ScheduleModule.forRoot(),
    AccessControlModule.forRoles(roles),
    AuthModule,
    UserModule,
    AppmenuModule,
    RoleModule,
    ServiceRequestModule,
    AccountModule,
    MailModule,
    PrintLabelsModule,
    GeneralSettingsModule,
    ServicesSaitModule,
    EnabledPlacesModule,
    PricingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
