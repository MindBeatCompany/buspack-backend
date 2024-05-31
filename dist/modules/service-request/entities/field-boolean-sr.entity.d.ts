import FormatServiceRequestEntity from './format-sr.entity';
export default class FieldBooleanEntity {
    id: number;
    fieldName: string;
    required: boolean;
    position: string;
    defaultValue: boolean;
    formatSr: FormatServiceRequestEntity;
}
