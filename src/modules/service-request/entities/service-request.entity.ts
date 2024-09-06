import { AccountEntity } from "../../account/entities/account.entity";
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("service-request")
export class ServiceRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, (account: AccountEntity) => account.serviceRequest)
  account: AccountEntity;

  @Column({ name: "request_id", type: "varchar", length: 50 })
  requestId: string;

  @Column({ name: "recipient_fullname", type: "varchar", length: 50 })
  recipientFullname: string;

  @Column({ name: "doc_type", type: "varchar", length: 50, nullable: false })
  docType: string;

  @Column({ name: "doc_number", type: "int", nullable: false })
  docNumber: number;

  @Column({ name: "phone", type: "varchar", length: 50, nullable: true })
  phone: string;

  @Column({ name: "email", type: "varchar", length: 50, nullable: true })
  email: string;

  @Column({ name: "address_street", type: "varchar", length: 50, nullable: false })
  addressStreet: string;

  @Column({ name: "address_number", type: "varchar", length: 50, nullable: true})
  addressNumber: string;

  @Column({ name: "address_building", type: "varchar", length: 50, nullable: true })
  addressBuilding: string;

  @Column({ name: "address_floor", type: "varchar", length: 10, nullable: true })
  addressFloor: string;

  @Column({ name: "address_apartment", type: "varchar", length: 50, nullable: true })
  addressApartment: string;
  
  @Column({ name: "address_cpa", type: "varchar", length: 10, nullable: true })
  addressCpa: string;

  @Column({ name: "enabled_place", type: "varchar", length: 50, nullable: false })
  enabledPlace: string;

  @Column({ name: "locality", type: "varchar", length: 50, nullable: false })
  locality: string;

  @Column({ name: "province", type: "varchar", length: 50, nullable: false })
  province: string;

  @Column({ name: "cpa", type: "varchar", length: 50, nullable: false })
  cpa: string;

  @Column({ name: "qty_pieces", type: "int" , nullable: false})
  qtyPieces: number;

  @Column({
    name: "total_weight",
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false
  })
  totalWeight: number;

  @Column({ name: "home_delivery", type: "boolean", default: false, nullable: false })
  homeDelivery: boolean;

  @Column({ name: "observations", type: "varchar", length: 50, nullable: true })
  observations: string;

  @Column({ name: "idfile", type: "varchar", length: 200, nullable: true })
  idfile: string;

  @Column({ name: "link", type: "varchar", length: 100, nullable: true })
  link: string;

  @Column({ name: "voucher", type: "varchar", length: 30, nullable: true })
  voucher: string;

  @Column({ name: "delivery", type: "text", nullable: true })
  delivery: string;

  @Column({ name: "status", type: "varchar", length: 30, nullable: true })
  status: string;

  @Column({ name: "status_datetime", type: "datetime", nullable: true })
  statusDatetime: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updateAt: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;
}
