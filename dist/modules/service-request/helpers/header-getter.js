"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HeaderGetter {
    getDefaultHeader() {
        return [
            "requestId",
            "recipientFullname",
            "docType",
            "docNumber",
            "phone",
            "email",
            "enabledPlace",
            "locality",
            "province",
            "cpa",
            "homeDelivery",
            "addressStreet",
            "addressNumber",
            "addressBuilding",
            "addressFloor",
            "addressApartment",
            "addressCpa",
            "qtyPieces",
            "totalWeight",
            "observations",
        ];
    }
    getCustomHeader(fieldnamesPositions) {
        const orderFieldnamesPositions = fieldnamesPositions
            .sort((fp1, fp2) => fp1.position - fp2.position);
        const res = [];
        const fstPos = orderFieldnamesPositions[0].position;
        if (fstPos !== 0) {
            const nEmptyStrings = this.getNEmptyStrings(fstPos);
            res.push(...nEmptyStrings);
        }
        for (let i = 0; i < orderFieldnamesPositions.length - 1; i++) {
            let currentFp = orderFieldnamesPositions[i];
            let nextFp = orderFieldnamesPositions[i + 1];
            let diffPositions = nextFp.position - currentFp.position;
            let currentFieldname = currentFp.fieldname;
            if (diffPositions === 1) {
                res.push(currentFieldname);
            }
            else {
                let emptyStrings = this.getNEmptyStrings(diffPositions - 1);
                res.push(currentFieldname, ...emptyStrings);
            }
        }
        const lastFP = orderFieldnamesPositions[orderFieldnamesPositions.length - 1];
        res.push(lastFP.fieldname);
        return res;
    }
    getNEmptyStrings(n) {
        let res = [];
        for (let i = 0; i < n; i++) {
            res.push("");
        }
        return res;
    }
}
exports.default = HeaderGetter;
//# sourceMappingURL=header-getter.js.map