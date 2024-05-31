import { UpdatePricesDto } from './dtos/request/update-prices.dto';
import { PricingService } from './pricing.service';
import { CreatePricingDto } from './dtos/request/create-pricing.dto';
export declare class PricingController {
    private readonly pricingService;
    constructor(pricingService: PricingService);
    createPricingTable(res: any, body: CreatePricingDto): Promise<any>;
    getAccountCurrentPricing(accountId: number, res: any): Promise<any>;
    getInfoToClone(accountId: number, res: any): Promise<any>;
    getAllAccounts(res: any): Promise<any>;
    getAllLocalities(res: any): Promise<any>;
    updatePricingTable(body: UpdatePricesDto, accountId: number, res: any): Promise<any>;
}
