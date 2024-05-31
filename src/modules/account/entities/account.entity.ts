import { TariffEntity } from "src/modules/user/entities/tariff.entity";
import { ServiceRequestEntity } from "src/modules/service-request/entities/service-request.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PricingEntity } from "src/modules/pricing/entities/pricing.entity";
import todayAtMidnight from "src/shared/today-midnight";
import { UpdatePricesDto } from "src/modules/pricing/dtos/request/update-prices.dto";

@Entity("accounts")
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_name", type: "varchar", length: 255 })
  companyName: string;

  @Column({ name: "id_clientEntity", type: "int", nullable: true })
  idClientEntity: number;

  @Column({ name: "id_clientAgent", type: "int", nullable: true })
  idClientAgent: number;

  @Column({ name: "cuit", type: "varchar", length: 30, nullable: true })
  cuit: string;

  @Column({ type: "varchar", length: 30 })
  codeECO: string;

  @Column({ name: "address_street", type: "varchar", length: 50, nullable: true })
  addressStreet: string;

  @Column({ name: "address_number", type: "varchar", length: 50, nullable: true })
  addressNumber: string;

  @Column({ name: "address_building", type: "varchar", length: 50, nullable: true })
  addressBuilding: string;

  @Column({ name: "address_floor", type: "varchar", length: 10, nullable: true })
  addressFloor: string;

  @Column({ name: "address_apartment", type: "varchar", length: 50, nullable: true })
  addressApartment: string;

  @Column({ name: "locality", type: "varchar", length: 50, nullable: true })
  locality: string;

  @Column({ name: "province", type: "varchar", length: 50, nullable: true })
  province: string;

  @Column({ name: "country", type: "varchar", length: 50, nullable: true })
  country: string;

  @Column({ type: "bool", default: true, select: false })
  isActive: boolean;

  @Column({ name: "account_type", type: "varchar", length: 255 })
  accountType: string;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.id)
  users: UserEntity[];

  @Column({ name: "file_path", type: "varchar", default: null })
  filePath: string;

  @OneToMany(() => TariffEntity, (tariff: TariffEntity) => tariff.id)
  tariff: TariffEntity[];

  @OneToMany(() => ServiceRequestEntity, (serviceRequest: ServiceRequestEntity) => serviceRequest.id)
  serviceRequest: ServiceRequestEntity[];

  @OneToMany(() => PricingEntity, (pricing) => pricing.account)
  pricings: PricingEntity[];

  @Column({name: "has_custom_pricing", default: false})
  hasCustomPricing: boolean;

  // ACTIONS
  validatePricing(name: string, validSince: Date) {
    if (this.haveCurrentPricing() && validSince.getTime() <= this.currentPricing().validSince.getTime()) {
      throw new Error("No se puede crear un tarifario con una fecha igual o menor a la del tarifario vigente");
    }

    if (this.pricings.some(it => it.validSince.getTime() === validSince.getTime())) {
      throw new Error("No se puede crear un tarifario con la misma fecha que un tarifario ya creado");
    }

    if (this.existPricingCalled(name)) {
      throw new Error(`${this.companyName} ya posee un tarifario llamado ${name}.`);
    }
  }

  updateCurrentPrices(updatePricesRequest: UpdatePricesDto) {
    return this.currentPricing().updateCurrentPrices(updatePricesRequest)
  }

  // ACCESSING
  currentPricing(): PricingEntity {
    if (this.pricings.length === 0) {
      return null;
    }

    const today = todayAtMidnight();

    const obtainedPricing = this.pricings.reduce((prev: PricingEntity, curr: PricingEntity) => {
      return this.canChange(curr, prev, today) ? curr : prev;
    }, this.pricings[0]);

    if (obtainedPricing.validSince > today) {
      throw new Error(`${this.companyName} does not have a current pricing table`);
    }

    return obtainedPricing;
  }

  // TESTING
  haveCurrentPricing(): boolean {
    try {
      return this.currentPricing() !== null;
    } catch (_) {
      return false;
    }
  }

  // PRIVATE TESTING
  private existPricingCalled(name: string): boolean {
    return this.pricings.some(it => it.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  }

  private canChange(curr: PricingEntity, prev: PricingEntity, today: Date): boolean {
    return (curr.validSince === today) ||
      (curr.validSince > prev.validSince && curr.validSince <= today) ||
      (curr.validSince <= today && prev.validSince > today);
  }
}
