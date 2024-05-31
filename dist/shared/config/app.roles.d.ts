import { RolesBuilder } from "nest-access-control";
export declare enum AppRoles {
    ADMIN = "ADMINISTRADOR",
    USER_ADMIN = "CORPORATIVO_ADMINISTRADOR",
    USER = "CORPORATIVO"
}
export declare enum AppResource {
    USER = "USER",
    ROLE = "ROLE",
    SERVICE_REQUEST = "SERVICE_REQUEST",
    ACCOUNT = "ACCOUNT",
    SETTINGS = "SETTINGS",
    SAIT_SERVICES = "SAIT_SERVICES",
    ENABLED_PLACES = "ENABLED_PLACES",
    PRICING = "PRICING"
}
export declare const roles: RolesBuilder;
