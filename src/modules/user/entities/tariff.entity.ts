import { AccountEntity } from "../../account/entities/account.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tariff")
export class TariffEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, (account: AccountEntity) => account.tariff)
  account: AccountEntity;
  @Column({
    name: "weight_from",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  weightFrom: number;
  @Column({
    name: "weight_to",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  weightTo: number;
  @Column({
    name: "caba",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  caba: number;
  @Column({
    name: "amba",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
  })
  amba: number;
  @Column({
    name: "inside_pba",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Interior PBA",
    default: 0,
  })
  inside_pba: number;
  @Column({
    name: "inside1",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Interior 1",
    default: 0,
  })
  inside1: number;
  @Column({
    name: "inside2",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Interior 2",
    default: 0,
  })
  inside2: number;
  @Column({
    name: "inside3",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Interior 3",
    default: 0,
  })
  inside3: number;
  @Column({
    name: "inside4",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Interior 4",
    default: 0,
  })
  inside4: number;
  @Column({
    name: "insurance",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Seguro",
    default: 0,
  })
  insurance: number;
  @Column({
    name: "home_delivery",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Envio a Domicilio",
    default: 0,
  })
  homeDelivery: number;
  @Column({
    name: "home_withdrawal",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Retiro a Domicilio",
    default: 0,
  })
  homeWithdrawal: number;
  @Column({
    name: "other_amounts",
    type: "decimal",
    precision: 10,
    scale: 2,
    comment: "Otros Importes",
    default: 0,
  })
  otherAmounts: number;
  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;
  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
