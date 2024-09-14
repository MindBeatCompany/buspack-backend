import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import messages from "src/shared/config/strings-constants";
import { CrudOperations } from "src/shared/interfaces/crud-operations.interface";
import { In, Not, Repository } from "typeorm";
import { UserCreatedDto } from "../user/dtos";
import { UserEntity } from "../user/entities/user.entity";
import {
  AccountCreatedDto,
  DeactivateAccountDto,
  UpdateAccountDto,
  AccountTypeTariffDto,
} from "./dtos";
import { AccountEntity } from "./entities/account.entity";

@Injectable()
export class AccountService implements CrudOperations {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  public async findAll(options?: Object): Promise<AccountCreatedDto[]> {
    const account = await this.accountRepository.find({
      where: {
        isActive: true,
        companyName: Not(process.env.DEFAULT_ACCOUNT_NAME),
      },
    });
    return account;
  }
  public async findById(id: number): Promise<Object> {
    throw new Error("Method not implemented.");
  }

  public async findOne(
    options?: Object,
    options2?: Object
  ): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne(options);
    if (!account) throw new Error(messages.noAccount);
    return account;
  }
  public async create(entity: Object, options?: Object): Promise<Object> {
    throw new Error("Method not implemented.");
  }
  public async update(
    id: number,
    newValue: UpdateAccountDto
  ): Promise<AccountCreatedDto> {
    const accountFound = await this.accountRepository.findOne({ id });
    if (!accountFound) throw new Error(messages.noAccount);
    const updatedAccount = this.accountRepository.merge(accountFound, newValue);
    return await this.accountRepository.save(updatedAccount);
  }

  public async updateTariffType(
    id: number,
    newValue: AccountTypeTariffDto
  ): Promise<AccountTypeTariffDto> {
    const accountFound = await this.accountRepository.findOne({ id });
    if (!accountFound) throw new Error(messages.noAccount);
    const updatedAccount = this.accountRepository.merge(accountFound, newValue);
    return await this.accountRepository.save(updatedAccount);
  }


  public async delete(id: number): Promise<void | Object> {
    throw new Error("Method not implemented.");
  }

  public async deactivate(
    account: DeactivateAccountDto
  ): Promise<AccountCreatedDto[]> {
    const daccounts = await this.accountRepository.findByIds(account.ids);
    if (!daccounts.length) throw new Error(messages.noAccount);
    daccounts.forEach((d) => {
      d.isActive = account.isActive;
    });

    const users = await this.userRepository.find({
      relations: ["account"],
      where: { account: In(daccounts.map((d) => d.id)) },
    });
    users.forEach((u) => {
      u.isActive = account.isActive;
    });
    await this.userRepository.save(users);
    await this.accountRepository.save(daccounts);
    return daccounts;
  }
  public async getUsers(id: number): Promise<UserCreatedDto[]> {
    const users = await this.userRepository.find({
      relations: ["role", "account"],
      where: { account: await this.accountRepository.findOne({ id }) },
    });
    if (!users.length) throw new Error(messages.userNotFound);
    return users;
  }

  public async getAccountByCuit(cuit: string|number): Promise<any[]> {
    const accountsFinded = await this.accountRepository.find({
      where: { cuit }
    })
    if(!accountsFinded.length) {
      return [];
    }
    return accountsFinded;
  }

  public async changeHasCustomPricing(id: number, newStatus: boolean) {
    const accountFound = await this.accountRepository.findOne({ id });
    if (!accountFound) throw new Error(messages.noAccount);

    accountFound.hasCustomPricing = newStatus;

    return await this.accountRepository.save(accountFound);
  }
}
