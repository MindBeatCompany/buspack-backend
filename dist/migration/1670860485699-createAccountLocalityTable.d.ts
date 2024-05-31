import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addAccountLocalityTable1670860485699 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
