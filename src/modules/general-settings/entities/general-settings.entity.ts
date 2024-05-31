import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity('general-settings')
export class GeneralSettingsEntity {
    @PrimaryColumn()
    id: number;
    
    @Column({name:"desc_lugar_origen", type:"varchar", length:255})
    descLugarOrigen: string;

    @Column({name:"id_lugar_origen", type:"int"})
    idLugarOrigen: number;

    @Column({name:"id_seguro", type:"int"})
    idSeguro: number;

    @Column({name :"letra_comprobante", type:"varchar", length:255})
    letraComprobante: string;

    @Column({name:"boca_comprobante", type:"varchar", length:255})
    bocaComprobante: string;

    @Column({name:"id_retiro_a_domicilio", type:"int"})
    idRetiroADomicilio: number;

    @Column({name:"id_entrega_domicilio", type:"int"})
    idEntregaDomicilio: number;

    @Column({name:"id_agencia_origen", type:"int"})
    idAgenciaOrigen: number;

    @Column({name:"desc_agencia_origen", type:"varchar", length:255})
    descAgenciaOrigen

    @Column({name:"domicilio_agencia_origen", type:"varchar", length:255})
    domicilioAgenciaOrigen

    @Column({name:"telefono_agencia_origen", type:"varchar", length:255})
    telefonoAgenciaOrigen

    @Column({name:"cp_agencia_origen", type:"varchar", length:255})
    cpAgenciaOrigen

    @Column({name:"otros_importes", type:"int"})
    otrosImportes:number

}