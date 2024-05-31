import { AccountEntity } from "src/modules/account/entities/account.entity";
import { EnabledPlaceEntity } from "src/modules/enabled-places/entities/enabled-places.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UpdatePricesDto } from "../dtos/request/update-prices.dto";
import { AreaEntity } from "./area.entity";

@Entity('pricings')
export class PricingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    name: string;

    @Column({ name: "last_area_number", type: "tinyint" })
    lastAreaNumber: number = 1;

    @OneToMany(() => AreaEntity, (area) => area.pricing, {
        eager: true,
        cascade: true
    })
    areas: AreaEntity[];

    @ManyToOne(() => AccountEntity, () => (account: AccountEntity) => account.pricings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "account_id" })
    account: AccountEntity;

    @Column({ name: "valid_since", type: "datetime" })
    validSince: Date

    // ACTIONS
    addArea(newArea: AreaEntity) {
        newArea.position = this.lastAreaNumber++;
        newArea.generatePriceTable();
        this.areas.push(newArea);
    }

    updateCurrentPrices(updatePricesRequest: UpdatePricesDto): PricingEntity {
        this.areas.forEach(it => it.updateCurrentPrices(updatePricesRequest));

        return this;
    }

    // ACCESSING
    getAreaFromEnabledPlace(enabledPlace: EnabledPlaceEntity) {
        const maybeArea = this.areas.find(area => area.containsLocality(enabledPlace));

        return maybeArea ? maybeArea : null;
      }
}
