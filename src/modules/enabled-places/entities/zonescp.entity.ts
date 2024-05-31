import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("zones_cp")
export class ZonesEntity {

  @PrimaryGeneratedColumn({ name: "id", type:'int' })
  id: number;

  @Column({ name: "zone", type: "varchar", length: 15 })
  zone: string;

  @Column({ name: "cp", type: "varchar", length: 8 })
  cp: string;
  
}
