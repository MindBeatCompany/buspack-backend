import { PrintLabels } from "../domain/print-labels";
import { PrintLabelsRequestDTO } from "../dtos/print-labels.dto";
export declare class PrintLabelsMapper {
    dtoToDomainMapperIn(printLabels: PrintLabelsRequestDTO): PrintLabels;
}
