import { Module } from '@nestjs/common';
import { PricingService } from './pricing.service';
import { PricingController } from './pricing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricingEntity } from './entities/pricing.entity';
import { AreaEntity } from './entities/area.entity';
import { LocalityEntity } from '../enabled-places/entities/location.entity';
import { AccountEntity } from '../account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature(
    [PricingEntity,
      AreaEntity,
      LocalityEntity,
      AccountEntity
    ])
  ],
  providers: [PricingService],
  controllers: [PricingController]
})
export class PricingModule { }
