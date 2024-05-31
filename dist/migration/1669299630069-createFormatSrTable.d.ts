import { MigrationInterface, QueryRunner } from "typeorm";
export declare class createTableFormatSR1669299630069 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
