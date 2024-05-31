import { SaitResponseInterface } from "./sait-response.interface";
export interface SaitResponseUploadInterface extends SaitResponseInterface {
    idarchivo: string;
    nombre: string;
    tipo: string;
    link: string;
    tamanio: number;
}
