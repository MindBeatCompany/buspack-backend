import FormatServiceRequestEntity from './format-sr.entity';
export default class FieldStringEntity {
    id: number;
    fieldName: string;
    required: boolean;
    position: string;
    length: number;
    defaultValue: string;
    formatSr: FormatServiceRequestEntity;
}
