import { HttpModule, HttpService, Module } from "@nestjs/common";
import { EnabledPlacesController } from "./enabled-places.controller";
import { EnabledPlacesService } from "./enabled-places.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnabledPlaceEntity } from "./entities/enabled-places.entity";
import { ProviderConstant } from "src/shared/config/provider.constant";
import { ConfigService } from "@nestjs/config";
import { AssociatedZipcodeService } from './associated-zipcode.service';
import { AssociatedZipCodeEntity } from "./entities/associated-zipcode.entity";
import { LocalityEntity } from "./entities/location.entity";
import { ServicesSaitModule } from "../services-sait/services-sait.module";

@Module({
  imports: [HttpModule, ServicesSaitModule, TypeOrmModule.forFeature([EnabledPlaceEntity,AssociatedZipCodeEntity, LocalityEntity])],
  controllers: [EnabledPlacesController],
  providers: [
    EnabledPlacesService,
    {
      provide: ProviderConstant.SAIT_BASE_URL,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<string>(ProviderConstant.SAIT_BASE_URL),
    },
    {
      provide: ProviderConstant.SAIT_TOKEN_API,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<string>(ProviderConstant.SAIT_TOKEN_API),
    },
    AssociatedZipcodeService,
  ],
})
export class EnabledPlacesModule {}
