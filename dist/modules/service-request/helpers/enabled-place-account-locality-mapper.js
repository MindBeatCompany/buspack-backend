"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enabledPlacesAccountLocalityMapper = void 0;
const enabledPlacesAccountLocalityMapper = (accountLocality, enabledPlace) => {
    let ac = accountLocality.find(ac => ac.enabledPlaceId === enabledPlace.id);
    if (ac === undefined) {
        enabledPlace = setUserGeoData(enabledPlace);
    }
    else {
        enabledPlace = setUserGeoData(enabledPlace, ac.locality, ac.province, ac.cp);
    }
    delete enabledPlace["id"];
    return enabledPlace;
};
exports.enabledPlacesAccountLocalityMapper = enabledPlacesAccountLocalityMapper;
const setUserGeoData = (enabledPlace, locality = null, province = null, cp = null) => {
    enabledPlace["localityUser"] = locality;
    enabledPlace["provinceUser"] = province;
    enabledPlace["cpUser"] = cp;
    return enabledPlace;
};
//# sourceMappingURL=enabled-place-account-locality-mapper.js.map