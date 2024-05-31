import FormatServiceRequestEntity from './format-sr.entity';
export default class FieldNumberEntity {
    id: number;
    fieldName: string;
    required: boolean;
    position: string;
    defaultValue: number;
    formatSr: FormatServiceRequestEntity;
}
