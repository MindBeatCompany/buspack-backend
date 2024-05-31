import {MigrationInterface, QueryRunner} from "typeorm";

export class createPricingAndAreaSchemas1675912453790 implements MigrationInterface {
    name = 'createPricingAndAreaSchemas1675912453790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `pricings` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `last_area_number` tinyint NOT NULL, `valid_since` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `areas` (`id` int NOT NULL AUTO_INCREMENT, `position` tinyint NOT NULL, `name` varchar(50) NOT NULL, `final_kilogram_value` mediumint NOT NULL, `increased_weight` mediumint NOT NULL, `starting_price_tariff` mediumint NOT NULL, `tariff_price_increase` mediumint NOT NULL, `insurance` mediumint NOT NULL, `home_delivery` mediumint NOT NULL, `home_withdrawal` mediumint NOT NULL, `others` mediumint NOT NULL, `additional_price_increase` mediumint NOT NULL, `price_table` json NOT NULL, `pricing_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `areas` ADD CONSTRAINT `FK_882b5425658d7f1e729504b9911` FOREIGN KEY (`pricing_id`) REFERENCES `pricings`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `areas` DROP FOREIGN KEY `FK_882b5425658d7f1e729504b9911`");
        await queryRunner.query("DROP TABLE `areas`");
        await queryRunner.query("DROP TABLE `pricings`");
    }

}
