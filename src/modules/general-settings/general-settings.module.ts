import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralSettingsEntity } from './entities/general-settings.entity';
import { GeneralSettingsController } from './general-settings.controller';
import { GeneralSettingsService } from './general-settings.service';

@Module({
  imports:[TypeOrmModule.forFeature([GeneralSettingsEntity])],
  controllers: [GeneralSettingsController],
  providers: [GeneralSettingsService]
})
export class GeneralSettingsModule {}
