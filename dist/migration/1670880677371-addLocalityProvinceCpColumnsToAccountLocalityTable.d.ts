import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addLocalityProvinceCpColumnsToAccountLocalityTable1670880677371 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
