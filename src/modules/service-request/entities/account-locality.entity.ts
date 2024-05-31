
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("account_locality")
export default class AccountLocalityEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "account_id", type: "smallint" })
    accountId: number;

    @Column({ name: "enabled_place_id", type: "smallint" })
    enabledPlaceId: number

    @Column({ nullable: true })
    locality!: string;

    @Column({ nullable: true })
    province!: string;

    @Column({ nullable: true })
    cp!: string; 
}