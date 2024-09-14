import { UserCreatedDto } from "../user/dtos";
import { AccountService } from "./account.service";
import { AccountCreatedDto, DeactivateAccountDto, UpdateAccountDto, AccountTypeTariffDto } from "./dtos";
import { ChangeHasCustomPricingFieldRequest } from "./dtos/chage-has-custom-pricing-field";
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    deactivateAccounts(res: any, body: DeactivateAccountDto): Promise<AccountCreatedDto[]>;
    getAll(res: any): Promise<AccountCreatedDto[]>;
    getAllUsers(res: any, id: string): Promise<UserCreatedDto[]>;
    update(res: any, id: string, body: UpdateAccountDto): Promise<AccountCreatedDto>;
    updateTarrifType(res: any, id: string, body: AccountTypeTariffDto): Promise<AccountTypeTariffDto>;
    changeHasCustomPricing(res: any, id: string, body: ChangeHasCustomPricingFieldRequest): Promise<any>;
}
