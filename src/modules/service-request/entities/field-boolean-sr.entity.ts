import { 
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

import FormatServiceRequestEntity from './format-sr.entity';

@Entity('field_boolean')
export default class FieldBooleanEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "field_name", type: "varchar", length: 30})
    fieldName: string;

    @Column({ type: "boolean"})
    required: boolean;

    @Column({ type: "tinyint", nullable: true })
    position: string;
    
    @Column({ type: "boolean", name: "default_value", nullable: true })
    defaultValue: boolean;

    @ManyToOne(() => FormatServiceRequestEntity, () => (formatSr: FormatServiceRequestEntity) => formatSr.stringFields, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "format_sr_id" })
    formatSr: FormatServiceRequestEntity
}
