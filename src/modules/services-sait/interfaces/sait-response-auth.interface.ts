import {SaitResponseInterface} from "./sait-response.interface";

export interface SaitResponseAuthInterface extends SaitResponseInterface{
    token: string;
}