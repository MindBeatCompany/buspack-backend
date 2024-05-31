
export default class LocalityToFormatValidator {

    /**
     * Retorna verdadero si la info brindada por el cliente es correcta, caso contrario devuelve la lista de errores
     * 
     * @param ltf - locality to format
     * @returns {string[]} errors
     */
    public static validate(ltf: any): string[] {
        var errors = [];

        const isInformationEnough = this.isInformationEnough(ltf);
        if (isInformationEnough) {
            errors = errors.concat(isInformationEnough);
        }

        return errors;
    }

    /**
     * si uno o ningun campo del json es undefined se considera que la informacion suficiente
     * @param {any} ltf - locality to format
     * @returns {string} - string vacio si la info es suficiente o el mensaje de error de lo contrario
     */
    private static isInformationEnough(ltf: any): string {

        let res = "";
        let countUndefined = 0;
        const keys = ['locality', 'cp', 'province'];

        keys.forEach(k => {
            if (ltf[k] === undefined) {
                countUndefined++;
            }
        })

        if (countUndefined === 2) {
            res = "Información insuficiente, complete al menos dos campos entre localidad, provincia y código postal";
        } 

        return res;
    }
}