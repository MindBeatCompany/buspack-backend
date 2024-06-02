import { Response } from 'express';
import { PrintLabelsRequestDTO } from './dtos/print-labels.dto';
import { PrintLabelsMapper } from './mapper/print-labels.mapper';
import { PrintLabelsService } from './print-labels.service';
export declare class PrintLabelsController {
    private readonly printLabelsService;
    private readonly printLabelsMapper;
    constructor(printLabelsService: PrintLabelsService, printLabelsMapper: PrintLabelsMapper);
    getPDFA4(data: PrintLabelsRequestDTO[], res: Response): Promise<void>;
    getPDF10x10(data: PrintLabelsRequestDTO[], res: Response): Promise<void>;
    getPDF10x15(data: PrintLabelsRequestDTO[], res: Response): Promise<void>;
    getPDF10x20(data: PrintLabelsRequestDTO[], res: Response): Promise<void>;
}
