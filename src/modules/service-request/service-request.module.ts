import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceRequestController } from "./service-request.controller";
import { ServiceRequestService } from "./service-request.service";
import { AccountEntity } from "../account/entities/account.entity";
import { ServiceRequestEntity } from "./entities/service-request.entity";
import { GeneralSettingsEntity } from "../general-settings/entities/general-settings.entity";
import { ServicesSaitModule } from "../services-sait/services-sait.module";
import { TariffEntity } from "../user/entities/tariff.entity";
import { ZonesEntity } from "../enabled-places/entities/zonescp.entity";
import { LocalityEntity } from "../enabled-places/entities/location.entity";
import { EnabledPlaceEntity } from "../enabled-places/entities/enabled-places.entity";
import FormatServiceRequestEntity from "./entities/format-sr.entity";
import  FiieldNumberEntity  from "./entities/field-number-sr.entity";
import FieldBooleanEntity from "./entities/field-boolean-sr.entity";
import FieldStringEntity from "./entities/field-string-sr.entity";
import HeaderGetter from "./helpers/header-getter";
import AccountLocalityEntity from "./entities/account-locality.entity";
import FormatEnabledPlaceFinder from "./helpers/enabled-place-finder/format-enabled-place-finder";
import DefaultServiceRequestValidator from "./helpers/validators/default-service-request-validator";
import FormatServiceRequestValidator from "./helpers/validators/format-service-request-validator";
import DefaultEnabledPlaceFinder from "./helpers/enabled-place-finder/default-enabled-place-finder";
import FormatSeparatorValidator from "./helpers/validators/format-separator-validator";
import UpdateFsrValidator from "./helpers/validators/update-fsr-validator";
import PlanillaExcelEntity from "./entities/planilla_excel.entity";


@Module({
  imports: [ServicesSaitModule, 
            TypeOrmModule.forFeature(
              [AccountEntity,
               PlanillaExcelEntity,
               ServiceRequestEntity,
               TariffEntity,
               ZonesEntity,
               GeneralSettingsEntity,
               LocalityEntity,
               EnabledPlaceEntity,
               FormatServiceRequestEntity,
               FiieldNumberEntity,
               FieldBooleanEntity,
               FieldStringEntity,
               AccountLocalityEntity,
              ])
           ],
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService,
              HeaderGetter,
              FormatEnabledPlaceFinder,
              DefaultEnabledPlaceFinder,
              DefaultServiceRequestValidator,
              FormatServiceRequestValidator,
              FormatSeparatorValidator,
              UpdateFsrValidator]
})
export class ServiceRequestModule {}
