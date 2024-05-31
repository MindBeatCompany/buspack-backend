import { Injectable } from "@nestjs/common";
import { PrintLabels } from "../domain/print-labels";
import { PrintLabelsRequestDTO } from "../dtos/print-labels.dto";

@Injectable()
export class PrintLabelsMapper{
    dtoToDomainMapperIn(printLabels:PrintLabelsRequestDTO):PrintLabels{
        return {
            recipient: printLabels.recipient,
            address: printLabels.address,
            cpa: printLabels.cpa,
            pieceId: printLabels.pieceId,
            idRequest: printLabels.idRequest,
            shipping: printLabels.shipping,
            state: printLabels.status,
            companyName: printLabels.companyName,
            ecoCode:  printLabels.ecoCode,
            city: printLabels.city, 
            province: printLabels.province,
            ed: printLabels.ed,
        }
    }
}
