import { IsString, IsInt } from "class-validator";

export class CreateGeneralSettingsDTO {
    @IsInt()
    id:number;

    @IsString()
    descLugarOrigen: string;

    @IsInt()
    idLugarOrigen: number;

    @IsInt()
    idSeguro: number;

    @IsString()
    letraComprobante: string;

    @IsString()
    bocaComprobante: string;

    @IsInt()
    idRetiroADomicilio: number;

    @IsInt()
    idEntregaDomicilio: number;
    
    @IsInt()
    idAgenciaOrigen: number;
    
    @IsString()
    descAgenciaOrigen: string;

    @IsString()
    domicilioAgenciaOrigen: string;

    @IsString()
    telefonoAgenciaOrigen: string;

    @IsString()
    cpAgenciaOrigen: string;

    @IsInt()
    otrosImportes: number;
}
