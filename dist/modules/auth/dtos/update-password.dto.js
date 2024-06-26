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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdatePasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { newPass: { required: true, type: () => String, minLength: 8 }, oldPass: { required: true, type: () => String } };
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsDefined(),
    class_validator_1.MinLength(8),
    class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~])[A-Za-z\d!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]{8,}$/),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "newPass", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsDefined(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "oldPass", void 0);
exports.UpdatePasswordDto = UpdatePasswordDto;
//# sourceMappingURL=update-password.dto.js.map