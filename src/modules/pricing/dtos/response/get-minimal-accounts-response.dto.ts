import { PickType } from "@nestjs/swagger";
import { AccountCreatedDto } from "src/modules/account/dtos";
import { AccountEntity } from "src/modules/account/entities/account.entity";

export class MinimalAccountDto extends PickType(AccountCreatedDto,['id', 'companyName', 'codeECO', 'accountType'] as const) {
    constructor(account: AccountEntity) {
        super();
        this.id = account.id;
        this.codeECO = account.codeECO;
        this.companyName = account.companyName;
        this.accountType = account.accountType;
    }
}
