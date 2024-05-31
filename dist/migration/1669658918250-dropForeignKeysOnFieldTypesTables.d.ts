import { MigrationInterface, QueryRunner } from "typeorm";
export declare class dropForeignKeysOnFieldTypesTables1669658918250 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
