import { MigrationInterface, QueryRunner } from "typeorm";
export declare class changeCpaAccountLocalityTableToString1681239487126 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
