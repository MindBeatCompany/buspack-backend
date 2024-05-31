import {SaitResponseInterface} from "./sait-response.interface";

export interface SaitResponseValidationResultInterface extends SaitResponseInterface{
    errorvalidacion: boolean,
    resultado: []
}