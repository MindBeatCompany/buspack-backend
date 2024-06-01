import { Controller,  Post, Res, Body, Header } from '@nestjs/common';
import {Response} from 'express';
import { readdirSync } from 'fs';
import { PrintLabelsRequestDTO } from './dtos/print-labels.dto';
import { PrintLabelsMapper } from './mapper/print-labels.mapper';
import { PrintLabelsService } from './print-labels.service';

@Controller('print-labels')
export class PrintLabelsController {
    constructor(private readonly printLabelsService: PrintLabelsService, private readonly printLabelsMapper: PrintLabelsMapper) {}

    @Post('/pdfA4')
    @Header("Content-type", "application/vnd.ms-excel")
    async getPDFA4(
      @Body() data: PrintLabelsRequestDTO[],
      @Res() res: Response,
    ): Promise<void> {
      const buffer = await this.printLabelsService.generatePDFA4(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));

      res.set({
        'Content-Type': 'application/pdfA4',
        'Content-Disposition': 'attachment; filename=example.pdf',// inline  attachment
        'Content-Length': buffer.length,
      })
      res.send(buffer) ;
    }

    @Post('/pdf10x10')
    @Header("Content-type", "application/vnd.ms-excel")
    async getPDF10x10(
      @Body() data: PrintLabelsRequestDTO[],
      @Res() res: Response,
    ): Promise<void> {
      const buffer = await this.printLabelsService.generatePDF10x10(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));

      res.set({
        'Content-Type': 'application/pdf10x10',
        'Content-Disposition': 'attachment; filename=example.pdf',// inline  attachment
        'Content-Length': buffer.length,
      })
      res.send(buffer) ;
    }

    @Post('/pdf10x15')
    @Header("Content-type", "application/vnd.ms-excel")
    async getPDF10x15(
      @Body() data: PrintLabelsRequestDTO[],
      @Res() res: Response,
    ): Promise<void> {
      const buffer = await this.printLabelsService.generatePDF10x15(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));

      res.set({
        'Content-Type': 'application/pdf10x15',
        'Content-Disposition': 'attachment; filename=example.pdf',// inline  attachment
        'Content-Length': buffer.length,
      })
      res.send(buffer) ;
    }

    @Post('/pdf10x20')
    @Header("Content-type", "application/vnd.ms-excel")
    async getPDF10x20(
      @Body() data: PrintLabelsRequestDTO[],
      @Res() res: Response,
    ): Promise<void> {
      const buffer = await this.printLabelsService.generatePDF10x20(data.map(d => this.printLabelsMapper.dtoToDomainMapperIn(d)));

      res.set({
        'Content-Type': 'application/pdf10x20',
        'Content-Disposition': 'attachment; filename=example.pdf',// inline  attachment
        'Content-Length': buffer.length,
      })
      res.send(buffer) ;
    }
}