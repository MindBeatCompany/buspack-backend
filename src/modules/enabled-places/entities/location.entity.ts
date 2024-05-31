import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnabledPlaceEntity } from "./enabled-places.entity";

@Entity("locality")
export class LocalityEntity {
  @PrimaryGeneratedColumn({ name: "idlocality", type:'int' })
  idlocality: number;

  @Column({ name: "zip_code", type: "int" })
  zip_code: number;

  @Column({ name: "province_name", type: "varchar", length:255 })
  province_name: string;

  @Column({ name: "locality_name", type: "varchar", length:255 })
  locality_name: string;

  @Column({ name: "enabled_place", type: "varchar", length:255 })
  enabled_place: string;

  @Column({ type: "bool", default: true, select: false })
  isActive: boolean;

  isEq(enabledPlace: EnabledPlaceEntity): boolean {
    return this.enabled_place === enabledPlace.place_name && this.locality_name === enabledPlace.locality_name &&
    this.province_name === enabledPlace.province_name;
}
}
