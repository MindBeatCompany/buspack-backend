
import { 
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import FormatServiceRequestEntity from './format-sr.entity';

@Entity('field_string')
export default class FieldStringEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "field_name", type: "varchar", length: 30})
    fieldName: string;

    @Column({ type: "boolean"})
    required: boolean;

    @Column({ type: "tinyint", nullable: true })
    position: string;

    @Column({ type: "smallint" })
    length: number;
    
    @Column({ type: "varchar", length: 255, name: "default_value", nullable: true })
    defaultValue: string;

    @ManyToOne(() => FormatServiceRequestEntity, () => (formatSr: FormatServiceRequestEntity) => formatSr.stringFields, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "format_sr_id" })
    formatSr: FormatServiceRequestEntity
}
