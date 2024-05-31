"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormatSrPositionsValidator {
    static validate(positions) {
        const set = new Set();
        positions.map(p => set.add(p));
        if (set.size !== positions.length) {
            throw new Error("There are repetead positions on request fields");
        }
    }
}
exports.default = FormatSrPositionsValidator;
//# sourceMappingURL=format-sr-positions-validator.js.map