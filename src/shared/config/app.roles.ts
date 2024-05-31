import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  ADMIN = "ADMINISTRADOR",
  USER_ADMIN = "CORPORATIVO_ADMINISTRADOR",
  USER = "CORPORATIVO",
}

export enum AppResource {
  USER = "USER",
  ROLE = "ROLE",
  SERVICE_REQUEST = "SERVICE_REQUEST",
  ACCOUNT = "ACCOUNT",
  SETTINGS = "SETTINGS",
  SAIT_SERVICES = "SAIT_SERVICES",
  ENABLED_PLACES = "ENABLED_PLACES",
  PRICING = "PRICING",
}

export const roles: RolesBuilder = new RolesBuilder();
roles
  .grant(AppRoles.USER)
  .readOwn([AppResource.USER, AppResource.SERVICE_REQUEST,AppResource.SAIT_SERVICES, AppResource.ENABLED_PLACES])
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
