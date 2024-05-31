import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AccountEntity } from '../account/entities/account.entity';
import { LocalityEntity } from '../enabled-places/entities/location.entity';
import { MinimalAccountDto } from './dtos/response/get-minimal-accounts-response.dto';
import { UpdatePricesDto } from './dtos/request/update-prices.dto';
import { AreaEntity } from './entities/area.entity';
import { PricingEntity } from './entities/pricing.entity';
import { CreatePricingDto } from './dtos/request/create-pricing.dto';
import { MinimalLocalityDto } from './dtos/response/get-minimal-localities-response.dto';
import { CreateAreaDto } from './dtos/request/create-area.dto';
import { LocalityOnCreatePricingDto } from './dtos/request/create-pricing-locality.dto';
import { PricingToCloneDto } from './dtos/response/get-pricing-to-clone.dto';

@Injectable()
export class PricingService {
    constructor(
        @InjectRepository(PricingEntity) private pricingRepository: Repository<PricingEntity>,
        @InjectRepository(AreaEntity) private areaRepository: Repository<AreaEntity>,
        @InjectRepository(LocalityEntity) private localityRepository: Repository<LocalityEntity>,
        @InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>,
    ) { }

    public async create(pricingDto: CreatePricingDto) {
        const desiredAccount = await this.accountRepository.findOneOrFail({ id: pricingDto.accountId }, { relations: ["pricings"] });
        const validDate = pricingDto.validSince;
        validDate.setHours(0, 0, 0, 0);

        this.checkIfIsValidPricing(desiredAccount, pricingDto);

        const newPricing = this.pricingRepository.create({
            name: pricingDto.name,
            validSince: validDate,
            areas: [],
            account: desiredAccount
        });

        await this.generateAreas(pricingDto.areas, newPricing);

        const pricing = await this.pricingRepository.save(newPricing);
        const { pricings, ...account } = desiredAccount;

        return { ...pricing, account };
    }

    public getPricingFrom(accountId: number): Promise<PricingEntity> {
        return this.accountRepository.findOneOrFail({ id: accountId }, { relations: ["pricings"] })
            .then(account => {
                this.checkExistCurrentPricingTable(account);
                return account.currentPricing();
            });
    }

    public getPricingToClone(accountId: number): Promise<PricingToCloneDto> {
        return this.accountRepository.findOneOrFail({ id: accountId }, { relations: ["pricings"] })
            .then(account => {
                this.checkExistCurrentPricingTable(account);
                return new PricingToCloneDto(account.currentPricing());
            });
    }

    public async getAccountsWithPricing(): Promise<MinimalAccountDto[]> {
        const accounts = await this.accountRepository.find({ relations: ['pricings'] });

        return accounts.filter(account => account.haveCurrentPricing()).map(it => new MinimalAccountDto(it));
    }

    public async getAllLocalities(): Promise<MinimalLocalityDto[]> {
        return this.localityRepository.find({
            where: {
                isActive: true,
            },
            select: ["locality_name", "province_name", "zip_code"],
        }).then(persistedLocalities => persistedLocalities.reduce((ls: MinimalLocalityDto[], l: MinimalLocalityDto) => {
            if (!ls.some(it => it.locality_name === l.locality_name && it.zip_code === l.zip_code)) {
                ls.push(l);
            }

            return ls;
        }, []));
    }

    public updatePricingTableFrom(accountId: number, body: UpdatePricesDto) {
        return this.accountRepository
            .findOneOrFail({ id: accountId }, { relations: ["pricings"] })
            .then(account => {
                this.checkExistCurrentPricingTable(account);
                account.updateCurrentPrices(body);
                return this.pricingRepository.save(account.currentPricing());
            });
    }

    private checkIfIsValidPricing(account: AccountEntity, pricingDto: CreatePricingDto) {
        const validDate = pricingDto.validSince;
        validDate.setHours(0, 0, 0, 0);

        account.validatePricing(pricingDto.name, validDate);

        this.checkIfExistADuplicatedLocality(pricingDto.areas);

        if (pricingDto.areas.length !== (new Set(pricingDto.areas.map(it => it.name.toLocaleLowerCase()))).size) {
            throw new Error("Existen zonas con nombres duplicados")
        }
    }

    private checkIfExistADuplicatedLocality(areas: CreateAreaDto[]) {
        const localities = areas.reduce((ls: LocalityOnCreatePricingDto[], l: CreateAreaDto) => {
            return ls.concat(l.localities);
        }, []);

        const localitiesWithoutDuplicates = localities.reduce((ls: LocalityOnCreatePricingDto[], l: LocalityOnCreatePricingDto) => {
            if (!ls.some(it => it.name === l.name && it.zipCode === l.zipCode)) {
                ls.push(l);
            }
            return ls;
        }, []);

        if (localities.length !== localitiesWithoutDuplicates.length) {
            throw new Error("Hay al menos una localidad duplicada dentro o entre las zonas");
        }
    }

    private checkExistCurrentPricingTable(account: AccountEntity) {
        if (!account.pricings || account.currentPricing() === null) {
            throw new Error(`${account.companyName} no tiene un tarifario creado o vigente`);
        }
    }

    private async findWithoutDuplicates(localities: LocalityOnCreatePricingDto[]) {
        return this.localityRepository.find({
            where: {
                zip_code: In(localities.map(it => it.zipCode)),
                locality_name: In(localities.map(it => it.name))
            }
        }).then(persistedLocalities => persistedLocalities.reduce((ls: LocalityEntity[], l: LocalityEntity) => {
            if (!ls.some(it => it.locality_name === l.locality_name && it.zip_code === l.zip_code)) {
                ls.push(l);
            }

            return ls;
        }, []));
    }

    private async generateAreas(areas: CreateAreaDto[], pricing: PricingEntity) {
        return await Promise.all(areas.map(async areaData => {
            const localities = await this.findWithoutDuplicates(areaData.localities);
            if (localities.length === 0) {
                throw new Error("Debe existir al menos una localidad para la zona " + areaData.name);
            }

            const area = this.areaRepository.create({
                name: areaData.name,
                finalKilogramValue: areaData.finalKilogramValue,
                increasedWeight: areaData.increasedWeight,
                startingTariffPrice: areaData.startingTariffPrice,
                tariffPriceIncrease: areaData.tariffPriceIncrease,
                insurance: areaData.insurance,
                homeDelivery: areaData.homeDelivery,
                homeWithdrawal: areaData.homeWithdrawal,
                others: areaData.others,
                additionalPriceIncrease: areaData.additionalPriceIncrease,
                priceTable: [],
                localities
            });

            pricing.addArea(area);
            return area;
        }));
    }
}
