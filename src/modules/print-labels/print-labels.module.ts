import { Module } from '@nestjs/common';
import { PrintLabelsMapper } from './mapper/print-labels.mapper';
import { PrintLabelsController } from './print-labels.controller';
import { PrintLabelsService } from './print-labels.service';

@Module({
  controllers: [PrintLabelsController],
  providers:[PrintLabelsService, PrintLabelsMapper]
})
export class PrintLabelsModule {}
