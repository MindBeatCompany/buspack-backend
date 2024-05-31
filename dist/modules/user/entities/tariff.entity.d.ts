import { AccountEntity } from "../../account/entities/account.entity";
export declare class TariffEntity {
    id: number;
    account: AccountEntity;
    weightFrom: number;
    weightTo: number;
    caba: number;
    amba: number;
    inside_pba: number;
    inside1: number;
    inside2: number;
    inside3: number;
    inside4: number;
    insurance: number;
    homeDelivery: number;
    homeWithdrawal: number;
    otherAmounts: number;
    createdAt: Date;
    deletedAt: Date;
}
