import { AccountCreatedDto } from "src/modules/account/dtos";
import { AccountEntity } from "src/modules/account/entities/account.entity";
declare const MinimalAccountDto_base: import("@nestjs/common").Type<Pick<AccountCreatedDto, "id" | "companyName" | "codeECO" | "accountType">>;
export declare class MinimalAccountDto extends MinimalAccountDto_base {
    constructor(account: AccountEntity);
}
export {};
