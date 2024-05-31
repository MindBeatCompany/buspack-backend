import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ServicesSaitController } from './services-sait.controller';
import { ServicesSaitService } from './services-sait.service';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [ServicesSaitController],
  imports: [HttpModule, AccountModule],
  providers: [ServicesSaitService],
  exports: [ServicesSaitService]
})
export class ServicesSaitModule {}
