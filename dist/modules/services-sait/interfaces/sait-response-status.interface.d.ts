import { SaitResponseInterface } from "./sait-response.interface";
export interface SaitResponseStatusInterface extends SaitResponseInterface {
    estado: number;
    mensaje: string;
    progreso: {};
}
