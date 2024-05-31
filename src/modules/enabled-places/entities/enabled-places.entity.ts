import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("enabled_places")
export class EnabledPlaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "idog", type: "varchar", length: 255 })
  idog: string;

  @Column({ name: "isActive", type: "varchar", length: 255 })
  isActive: string;

  @Column({ name: "code", type: "varchar", length: 255 })
  code: string;

  @Column({ name: "place_name", type: "varchar", length: 255 })
  place_name: string;

  @Column({ name: "type_description", type: "varchar", length: 255 })
  type_description: string;

  @Column({ name: "locality_name", type: "varchar", length: 255 })
  locality_name: string;

  @Column({ name: "province_name", type: "varchar", length: 255 })
  province_name: string;
}
