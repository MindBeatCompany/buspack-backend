import { EnabledPlaceEntity } from "src/modules/enabled-places/entities/enabled-places.entity";
import { LocalityEntity } from "src/modules/enabled-places/entities/location.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UpdatePricesDto } from "../dtos/request/update-prices.dto";
import { ColumnPricingToUpdate } from "../enums/column-pricing-to-update.enum";
import { PricingTableColumn } from "../enums/table-column.enum";
import UpdatePricingType from "../enums/update-pricing-type.enum";
import { PricingEntity } from "./pricing.entity";

@Entity('areas')
export class AreaEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "tinyint" })
    position: number;

    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ name: "final_kilogram_value", type: "mediumint" })
    finalKilogramValue: number;

    @Column({ name: "increased_weight", type: "mediumint" })
    increasedWeight: number;

    @Column({ name: "starting_price_tariff", type: "mediumint" })
    startingTariffPrice: number;

    @Column({ name: "tariff_price_increase", type: "mediumint" })
    tariffPriceIncrease: number;

    @Column({ type: "mediumint" })
    insurance: number;

    @Column({ name: "home_delivery", type: "mediumint" })
    homeDelivery: number;

    @Column({ name: "home_withdrawal", type: "mediumint" })
    homeWithdrawal: number;

    @Column({ type: "mediumint" })
    others: number;

    @Column({ name: "additional_price_increase", type: "mediumint" })
    additionalPriceIncrease: number;

    @ManyToOne(() => PricingEntity, () => (pricing: PricingEntity) => pricing.areas, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "pricing_id" })
    pricing: PricingEntity;

    @Column({
        type: "json",
        name: "price_table"
      })
    priceTable: {
        maxWeight;
        basePrice;
        insurance;
        minWeight
        homeDelivery;
        homeWithdrawal;
        others;
      }[];

    @ManyToMany(() => LocalityEntity, {
        eager: true,
    })
    @JoinTable()
    localities: LocalityEntity[];

    // ACTIONS
    generatePriceTable() {
        const priceTable = [];
        let actualWeight = 0;
        let actualPrice = this.startingTariffPrice;
        let actualInsurance = this.insurance;
        let actualHomeDelivery = this.homeDelivery;
        let actualHomeWithdrawal = this.homeWithdrawal;
        let actualOthers = this.others;

        while (actualWeight < this.finalKilogramValue) {
            const newRow = {
                maxWeight: null,
                basePrice: null,
                insurance: null,
                minWeight: null,
                homeDelivery: null,
                homeWithdrawal: null,
                others: null,
              };

            newRow.minWeight = actualWeight;
            newRow.maxWeight = actualWeight + this.increasedWeight;
            newRow.basePrice = actualPrice;
            newRow.insurance = actualInsurance;
            newRow.homeDelivery = actualHomeDelivery;
            newRow.homeWithdrawal = actualHomeWithdrawal;
            newRow.others = actualOthers;

            priceTable.push(newRow);

            actualWeight = actualWeight + this.increasedWeight;
            actualPrice = actualPrice + this.tariffPriceIncrease;
            actualInsurance = actualInsurance + this.additionalPriceIncrease;
            actualHomeDelivery = actualHomeDelivery + this.additionalPriceIncrease;
            actualHomeWithdrawal = actualHomeWithdrawal + this.additionalPriceIncrease;
            actualOthers = actualOthers + this.additionalPriceIncrease;
        }

        priceTable[priceTable.length - 1].maxWeight = this.finalKilogramValue;

        this.priceTable = priceTable;
    }

    updateCurrentPrices({ column, type, amount }: UpdatePricesDto): void {
        if (this.isColumn(column, ColumnPricingToUpdate.ADDITIONAL_INCREASE)) {
            this.additionalPriceIncrease += type === UpdatePricingType.FIXED_AMOUNT ?
                amount :
                Math.floor(this.additionalPriceIncrease * (amount / 100));
        }

        if (this.isColumn(column, ColumnPricingToUpdate.TARIFF_INCREASE)) {
            this.tariffPriceIncrease += type === UpdatePricingType.FIXED_AMOUNT ?
                amount :
                Math.floor(this.tariffPriceIncrease * (amount / 100));
        }

        if (this.isColumn(column, ColumnPricingToUpdate.TARIFF)) {
            this.startingTariffPrice += type === UpdatePricingType.FIXED_AMOUNT ?
                amount :
                Math.floor(this.startingTariffPrice * (amount / 100));
        }

        if (this.isColumn(column, ColumnPricingToUpdate.HOME_DELIVERY)) {
            this.homeDelivery += type === UpdatePricingType.FIXED_AMOUNT ?
                amount :
                Math.floor(this.homeDelivery * (amount / 100));
        }

        if (this.isColumn(column, ColumnPricingToUpdate.HOME_WITHDRAWAL)) {
            this.homeWithdrawal += type === UpdatePricingType.FIXED_AMOUNT ?
                amount :
                Math.floor(this.homeWithdrawal * (amount / 100));
        }

        if (this.isColumn(column, ColumnPricingToUpdate.INSURANCE)) {
            this.insurance += type === UpdatePricingType.FIXED_AMOUNT ?
                amount :
                Math.floor(this.insurance * (amount / 100));
        }
        
        if (this.isColumn(column, ColumnPricingToUpdate.OTHERS)) {
            this.others += type === UpdatePricingType.FIXED_AMOUNT ?
                amount :
                Math.floor(this.others * (amount / 100));
        }

        this.generatePriceTable();
    }

    // ACCESSING
    getPriceRowFrom(weight: number) {
        const rowPrice = this.priceTable.find(row => weight >= row.minWeight && weight <= row.maxWeight);
        return rowPrice ? rowPrice : null;
    }

    // TESTING

    containsLocality(enabledPlace: EnabledPlaceEntity) {
        return this.localities.some( locality => locality.isEq(enabledPlace))
    }

    

    // PRIVATE ACTIONS

    private updateColumnAmountFor(column: ColumnPricingToUpdate, currentColumn: ColumnPricingToUpdate, tableColumn: PricingTableColumn, type: UpdatePricingType, amount: number) {
        if (this.isColumn(column, currentColumn)) {
            this.updateValueFor(tableColumn, type, amount);
        }
    }

    private updateValueFor(atribute: PricingTableColumn, type: UpdatePricingType, amount: number) {
        this.priceTable.forEach(it => {
            it[atribute] += type === UpdatePricingType.FIXED_AMOUNT ?
                amount :
                Math.floor(it[atribute] * (amount / 100));
        });
    }

    // PRIVATE TESTING

    private isColumn(currentColumn: ColumnPricingToUpdate, comparedColumn): boolean {
        return currentColumn === comparedColumn || currentColumn === ColumnPricingToUpdate.ALL;
    }

}
