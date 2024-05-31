"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingModule = void 0;
const common_1 = require("@nestjs/common");
const pricing_service_1 = require("./pricing.service");
const pricing_controller_1 = require("./pricing.controller");
const typeorm_1 = require("@nestjs/typeorm");
const pricing_entity_1 = require("./entities/pricing.entity");
const area_entity_1 = require("./entities/area.entity");
const location_entity_1 = require("../enabled-places/entities/location.entity");
const account_entity_1 = require("../account/entities/account.entity");
let PricingModule = class PricingModule {
};
PricingModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([pricing_entity_1.PricingEntity,
                area_entity_1.AreaEntity,
                location_entity_1.LocalityEntity,
                account_entity_1.AccountEntity
            ])
        ],
        providers: [pricing_service_1.PricingService],
        controllers: [pricing_controller_1.PricingController]
    })
], PricingModule);
exports.PricingModule = PricingModule;
//# sourceMappingURL=pricing.module.js.map