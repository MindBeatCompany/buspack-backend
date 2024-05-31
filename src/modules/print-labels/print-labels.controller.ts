import { Controller,  Post, Res, Body, Header } from '@nestjs/common';
import {Response} from 'express';
import { readdirSync } from 'fs';
import { PrintLabelsRequestDTO } from './dtos/print-labels.dto';
import { PrintLabelsMapper } from './mapper/print-labels.mapper';
import { PrintLabelsService } from './print-labels.service';

@Controller('print-labels')
export class PrintLabelsController {
    constructor(private readonly printLabelsService: PrintLabelsService, private readonly printLabelsMapper: PrintLabelsMapper) {}

    @Post('/pdf')
    @Header("Content-type", "application/vnd.ms-excel")
    async getPDF(
      @Body() data: PrintLabelsRequestDTO[],
      @Res() res: Response,
    ): Promise<void> {
      const buffer = await this.printLabelsService.generatePDF(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=example.pdf',// inline  attachment
        'Content-Length': buffer.length,
      })
      res.send(buffer) ;
    }
}
