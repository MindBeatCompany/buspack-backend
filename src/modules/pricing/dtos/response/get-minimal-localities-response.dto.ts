import { PickType } from "@nestjs/swagger";
import { LocalityEntity } from "src/modules/enabled-places/entities/location.entity";

export class MinimalLocalityDto extends PickType(LocalityEntity,['zip_code', 'province_name', 'locality_name'] as const) { }
