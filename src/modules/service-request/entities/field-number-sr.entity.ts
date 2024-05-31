import { 
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import FormatServiceRequestEntity from './format-sr.entity';

@Entity('field_number')
export default class FieldNumberEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "field_name", type: "varchar", length: 30})
    fieldName: string;

    @Column({ type: "boolean" })
    required: boolean;

    @Column({ type: "tinyint", nullable: true })
    position: string;
    
    @Column({ type: "smallint", name: "default_value", nullable: true })
    defaultValue: number;

    @ManyToOne(() => FormatServiceRequestEntity, () => (formatSr: FormatServiceRequestEntity) => formatSr.stringFields, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "format_sr_id" })
    formatSr: FormatServiceRequestEntity
}
