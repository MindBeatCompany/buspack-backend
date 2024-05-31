import {SaitResponseInterface} from "./sait-response.interface";

export interface SaitResponseStatusDeliveryInterface extends  SaitResponseInterface {
    estado: number;
    mensaje: string;
    numero: string;
    estadodelivery: {},
    datos:[],
    estados:[]
}