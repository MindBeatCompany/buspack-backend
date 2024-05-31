import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addQuoteCharColumnToFormatSrTable1675112092520 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
