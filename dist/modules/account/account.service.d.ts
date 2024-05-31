import { CrudOperations } from "src/shared/interfaces/crud-operations.interface";
import { Repository } from "typeorm";
import { UserCreatedDto } from "../user/dtos";
import { UserEntity } from "../user/entities/user.entity";
import { AccountCreatedDto, DeactivateAccountDto, UpdateAccountDto } from "./dtos";
import { AccountEntity } from "./entities/account.entity";
export declare class AccountService implements CrudOperations {
    private readonly accountRepository;
    private readonly userRepository;
    constructor(accountRepository: Repository<AccountEntity>, userRepository: Repository<UserEntity>);
    findAll(options?: Object): Promise<AccountCreatedDto[]>;
    findById(id: number): Promise<Object>;
    findOne(options?: Object, options2?: Object): Promise<AccountEntity>;
    create(entity: Object, options?: Object): Promise<Object>;
    update(id: number, newValue: UpdateAccountDto): Promise<AccountCreatedDto>;
    delete(id: number): Promise<void | Object>;
    deactivate(account: DeactivateAccountDto): Promise<AccountCreatedDto[]>;
    getUsers(id: number): Promise<UserCreatedDto[]>;
    getAccountByCuit(cuit: string | number): Promise<any[]>;
    changeHasCustomPricing(id: number, newStatus: boolean): Promise<AccountEntity>;
}
