"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.AppResource = exports.AppRoles = void 0;
const nest_access_control_1 = require("nest-access-control");
var AppRoles;
(function (AppRoles) {
    AppRoles["ADMIN"] = "ADMINISTRADOR";
    AppRoles["USER_ADMIN"] = "CORPORATIVO_ADMINISTRADOR";
    AppRoles["USER"] = "CORPORATIVO";
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
var AppResource;
(function (AppResource) {
    AppResource["USER"] = "USER";
    AppResource["ROLE"] = "ROLE";
    AppResource["SERVICE_REQUEST"] = "SERVICE_REQUEST";
    AppResource["ACCOUNT"] = "ACCOUNT";
    AppResource["SETTINGS"] = "SETTINGS";
    AppResource["SAIT_SERVICES"] = "SAIT_SERVICES";
    AppResource["ENABLED_PLACES"] = "ENABLED_PLACES";
    AppResource["PRICING"] = "PRICING";
})(AppResource = exports.AppResource || (exports.AppResource = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles
    .grant(AppRoles.USER)
    .readOwn([AppResource.USER, AppResource.SERVICE_REQUEST, AppResource.SAIT_SERVICES, AppResource.ENABLED_PLACES])
    .createOwn([AppResource.SERVICE_REQUEST, AppResource.ENABLED_PLACES])
    .updateOwn([AppResource.USER, AppResource.SERVICE_REQUEST, AppResource.ENABLED_PLACES])
    .grant(AppRoles.USER_ADMIN)
    .extend(AppRoles.USER)
    .readOwn([AppResource.ROLE])
    .readAny([AppResource.USER, AppResource.SERVICE_REQUEST])
    .createAny([AppResource.USER, AppResource.SERVICE_REQUEST])
    .updateAny([AppResource.USER])
    .deleteAny([AppResource.USER])
    .grant(AppRoles.ADMIN)
    .extend(AppRoles.USER_ADMIN)
    .createAny([AppResource.ROLE, AppResource.SETTINGS, AppResource.PRICING])
    .updateAny([AppResource.ROLE, AppResource.ACCOUNT, AppResource.SERVICE_REQUEST, AppResource.SETTINGS, AppResource.PRICING])
    .deleteAny([AppResource.ROLE, AppResource.SERVICE_REQUEST, AppResource.SETTINGS, AppResource.PRICING])
    .readAny([AppResource.ROLE, AppResource.ACCOUNT, AppResource.SETTINGS, AppResource.PRICING]);
//# sourceMappingURL=app.roles.js.map