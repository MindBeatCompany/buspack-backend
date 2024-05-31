import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("planilla_excel")
export default class PlanillaExcelEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "excel", type: "longtext" })
    excel: string;

   
}