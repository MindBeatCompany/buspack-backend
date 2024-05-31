import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("associated_zipcode")
export class AssociatedZipCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "main_zip_code", type: "int" })
  mainZipCode: number;

  @Column({ name: "nearby_zip_code", type: "int" })
  nearbyZipCode: number;
}
