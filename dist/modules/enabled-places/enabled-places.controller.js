"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnabledPlacesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_roles_1 = require("../../shared/config/app.roles");
const auth_decorator_1 = require("../../shared/decorators/auth.decorator");
const return_messages_1 = require("../../shared/return-messages");
const associated_zipcode_service_1 = require("./associated-zipcode.service");
const enabled_places_service_1 = require("./enabled-places.service");
let EnabledPlacesController = class EnabledPlacesController {
    constructor(enabledPlacesService, associatedZipCodeSevice) {
        this.enabledPlacesService = enabledPlacesService;
        this.associatedZipCodeSevice = associatedZipCodeSevice;
    }
    async getLocalityByAssociatedZipCode(enabledPlace, res) {
        return this.associatedZipCodeSevice
            .getLocality(enabledPlace)
            .then((data) => {
            res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: data,
            });
        })
            .catch((error) => {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async getEnabledPlacesLocal(res) {
        console.log("11111111111111111111111");
        return this.associatedZipCodeSevice
            .getEnabledPlacesLocalActive(["enabled_place", "locality_name", "province_name", "zip_code"])
            .then((result) => {
            res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: result,
            });
        })
            .catch((error) => {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: return_messages_1.default(error.message),
            });
        });
    }
    async getEnabledPlacesSait(res) {
        return this.enabledPlacesService
            .getEnabledPlacesSait()
            .then(() => {
            res.status(common_1.HttpStatus.OK).json({
                status: common_1.HttpStatus.OK,
                success: true,
                data: true,
            });
        })
            .catch((error) => {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: return_messages_1.default(error.message),
            });
        });
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: "Get locality" }),
    common_1.Get("locality"),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.ENABLED_PLACES,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Query("enabled_place")),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EnabledPlacesController.prototype, "getLocalityByAssociatedZipCode", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get enabled places" }),
    common_1.Get(),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.ENABLED_PLACES,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EnabledPlacesController.prototype, "getEnabledPlacesLocal", null);
__decorate([
    swagger_1.ApiOperation({ summary: "Get enabled places from SAIT" }),
    common_1.Get("/sait"),
    auth_decorator_1.default({
        action: "read",
        possession: "own",
        resource: app_roles_1.AppResource.ENABLED_PLACES,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EnabledPlacesController.prototype, "getEnabledPlacesSait", null);
EnabledPlacesController = __decorate([
    common_1.Controller("enabled-places"),
    __metadata("design:paramtypes", [enabled_places_service_1.EnabledPlacesService,
        associated_zipcode_service_1.AssociatedZipcodeService])
], EnabledPlacesController);
exports.EnabledPlacesController = EnabledPlacesController;
//# sourceMappingURL=enabled-places.controller.js.map