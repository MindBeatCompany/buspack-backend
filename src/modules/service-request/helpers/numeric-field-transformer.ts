
export default class NumberFieldTransformer {

    public static transform(numericFieldsDto: any[]): any[] {
        numericFieldsDto.forEach(nfd => {
            const fieldName = Object.keys(nfd)[0];
            let defaultValue = nfd[fieldName].defaultValue;

            if (defaultValue !== null) {
                if (typeof defaultValue === "string") defaultValue = defaultValue.replace(",", ".");
                const castedDefaultValue = Number(defaultValue); 
                if (Object.is(castedDefaultValue, NaN)) {
                    throw new Error(`Cant cast defaultValue ${defaultValue} of ${fieldName}`)
                } else {
                    nfd[fieldName].defaultValue = castedDefaultValue
                }
            }
        })

        return numericFieldsDto;
    }
}
