
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import FieldStringEntity from "./field-string-sr.entity";
import FieldNumberEntity from "./field-number-sr.entity";
import FieldBooleanEntity from "./field-boolean-sr.entity";

@Entity("format_sr")
export default class FormatServiceRequestEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 3 })
    format: string;

    @Column({  type: "varchar", length: 11, nullable: true })
    separator: string;

    @Column({ name: "account_id" })
    accountId: number;

    @OneToMany(() => FieldStringEntity, (stringField) => stringField.formatSr)
    stringFields: FieldStringEntity[];

    @OneToMany(() => FieldNumberEntity, (numericField) => numericField.formatSr)
    numericFields: FieldNumberEntity[];

    @OneToMany(() => FieldBooleanEntity, (booleanField) => booleanField.formatSr)
    booleanFields: FieldBooleanEntity[];

    @Column({ type: "varchar", length: 1, name: "quote_char" })
    quoteChar: string;
}
