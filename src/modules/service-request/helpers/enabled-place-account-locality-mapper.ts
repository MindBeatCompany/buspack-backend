
import AccountLocalityEntity from "../entities/account-locality.entity";

export const enabledPlacesAccountLocalityMapper = (accountLocality: AccountLocalityEntity[], enabledPlace: any): any => {
    let ac = accountLocality.find(ac => ac.enabledPlaceId === enabledPlace.id);

    if (ac === undefined) {
        enabledPlace = setUserGeoData(enabledPlace);
    } else {
        enabledPlace = setUserGeoData(enabledPlace, ac.locality, ac.province, ac.cp);
    }

    delete enabledPlace["id"];

    return enabledPlace;
}

const setUserGeoData = (enabledPlace, locality = null, province = null, cp = null) => {
    enabledPlace["localityUser"] = locality;
    enabledPlace["provinceUser"] = province;
    enabledPlace["cpUser"] = cp;

    return enabledPlace;
}
