"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalityToFormatValidator {
    static validate(ltf) {
        var errors = [];
        const isInformationEnough = this.isInformationEnough(ltf);
        if (isInformationEnough) {
            errors = errors.concat(isInformationEnough);
        }
        return errors;
    }
    static isInformationEnough(ltf) {
        let res = "";
        let countUndefined = 0;
        const keys = ['locality', 'cp', 'province'];
        keys.forEach(k => {
            if (ltf[k] === undefined) {
                countUndefined++;
            }
        });
        if (countUndefined === 2) {
            res = "Información insuficiente, complete al menos dos campos entre localidad, provincia y código postal";
        }
        return res;
    }
}
exports.default = LocalityToFormatValidator;
//# sourceMappingURL=locality-to-format-validator.js.map