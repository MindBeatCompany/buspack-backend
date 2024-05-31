import { Response } from 'express';
import { PrintLabelsRequestDTO } from './dtos/print-labels.dto';
import { PrintLabelsMapper } from './mapper/print-labels.mapper';
import { PrintLabelsService } from './print-labels.service';
export declare class PrintLabelsController {
    private readonly printLabelsService;
    private readonly printLabelsMapper;
    constructor(printLabelsService: PrintLabelsService, printLabelsMapper: PrintLabelsMapper);
    getPDF(data: PrintLabelsRequestDTO[], res: Response): Promise<void>;
}
