import { CreateUserDto } from "./createUser.dto";
export declare class CreateMultiUserDto {
    companyName: string;
    idClientEntity: number;
    idClientAgent: number;
    cuit: string;
    addressStreet: string;
    addressNumber: string;
    addressBuilding: string;
    addressFloor: string;
    addressApartment: string;
    locality: string;
    province: string;
    country: string;
    accountType: string;
    codeEco: string;
    filePath: string;
    users: CreateUserDto[];
}
