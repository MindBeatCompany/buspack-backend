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
exports.ServicesSaitService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const sait_auth_dto_1 = require("./dto/sait-auth.dto");
const sait_url_enums_1 = require("./enums/sait-url.enums");
const account_service_1 = require("../account/account.service");
let ServicesSaitService = class ServicesSaitService {
    constructor(http, acountService) {
        this.http = http;
        this.acountService = acountService;
        this._saitCredential = null;
        this._urlSait = "";
        this._token = "";
        this.saitUrl = "sait";
        this.cuitUrl = "clienteCuentaCorriente";
        this._saitCredential = new sait_auth_dto_1.SaitAuthDto();
        this._saitCredential.usuario = process.env.SAIT_USER;
        this._saitCredential.password = process.env.SAIT_USER_PASSWORD;
        this._urlSait = process.env.SAIT_BASE_URL;
    }
    async saitAccessToken() {
        let _ax = this.http.axiosRef;
        return await _ax.post(this._urlSait + sait_url_enums_1.SaitUrlEnum.AUTH, "usuario=" + this._saitCredential.usuario + "&password=" + this._saitCredential.password)
            .then(value => {
            console.log(this._saitCredential.usuario);
            console.log(this._saitCredential.password);
            console.log(value.status);
            console.log(value.data);
            return value.data;
        }).catch(reason => {
            console.log(reason);
            throw reason;
        });
    }
    async saitFileUpload2(filepath, token) {
        try {
            const { Curl } = require('node-libcurl');
            const curl = new Curl();
            const close = curl.close.bind(curl);
            curl.setOpt(Curl.option.URL, this._urlSait + sait_url_enums_1.SaitUrlEnum.UPLOAD);
            curl.setOpt(Curl.option.HTTPHEADER, [`token: ${token}`]);
            curl.setOpt(Curl.option.HTTPPOST, [
                { name: 'pfile', file: filepath, type: 'file' }
            ]);
            let self = this;
            curl.on("end", function (statusCode, data, headers) {
                const myData = JSON.parse(data);
                console.log(myData.idarchivo);
                console.info("***");
                console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));
                self.saitValidate(myData.idarchivo, token);
                this.close();
            });
            curl.on('error', function (error, errorCode) {
                console.error(error, errorCode);
                this.close();
            });
            curl.perform();
        }
        catch (e) {
            console.log("error trycatch");
            console.log(e);
        }
    }
    async saitFileUpload(filepath, token) {
        try {
            const { curly } = require('node-libcurl');
            const { statusCode, data, headers } = await curly.post(this._urlSait + sait_url_enums_1.SaitUrlEnum.UPLOAD, {
                HTTPPOST: [
                    {
                        name: "pfile",
                        file: filepath,
                        type: "file",
                    },
                ],
                httpHeader: [`token: ${token}`],
            });
            console.log(statusCode);
            console.log(data);
            return data;
        }
        catch (e) {
            console.log("error trycatch");
            console.log(e);
        }
    }
    async saitValidate(idarchivo, token) {
        const config = {
            "token": token
        };
        let _ax = this.http.axiosRef;
        return await _ax.get(this._urlSait + sait_url_enums_1.SaitUrlEnum.VALIDATE + `?idarchivo=${idarchivo}`, { headers: config })
            .then(value => {
            console.log(value.data);
            return value.data;
        }).catch(reason => {
            console.log(reason);
            throw reason;
        });
    }
    async saitValidationResult(idarchivo, token) {
        const config = {
            "token": token
        };
        let _ax = this.http.axiosRef;
        return await _ax.get(this._urlSait + sait_url_enums_1.SaitUrlEnum.VALIDATION_RESULT + `?idarchivo=${idarchivo}`, { headers: config })
            .then(response => {
            return response.data;
        }).catch(reason => {
            console.log(reason);
            throw reason;
        });
    }
    async saitProcess(idarchivo, token) {
        const config = {
            "token": token
        };
        let _ax = this.http.axiosRef;
        return await _ax.post(this._urlSait + sait_url_enums_1.SaitUrlEnum.PROCESS, "idarchivo=" + idarchivo, { headers: config })
            .then(value => {
            return value.data;
        }).catch(reason => {
            console.log(reason);
            throw reason;
        });
    }
    async saitProcessResult(idarchivo, token) {
        const config = {
            "token": token
        };
        let _ax = this.http.axiosRef;
        return await _ax.get(this._urlSait + sait_url_enums_1.SaitUrlEnum.PROCESS_RESULT + `?idarchivo=${idarchivo}`, { headers: config })
            .then(value => {
            return value.data;
        }).catch(reason => {
            console.log(reason);
            throw reason;
        });
    }
    async saitStatus(idarchivo, token) {
        const config = {
            "token": token
        };
        let _ax = this.http.axiosRef;
        return await _ax.get(this._urlSait + sait_url_enums_1.SaitUrlEnum.STATUS + `?idarchivo=${idarchivo}`, { headers: config })
            .then(value => {
            return value.data;
        }).catch(reason => {
            console.log(reason);
            throw reason;
        });
    }
    async saitDeliveryStatus(numero, token) {
        console.log("entre a saitDeliveryStatus linea 204 services-sait.services.ts");
        const config = {
            "token": token
        };
        let _ax = this.http.axiosRef;
        return await _ax.get(this._urlSait + sait_url_enums_1.SaitUrlEnum.DELIVERY_STATUS + `?numero=${numero}`, { headers: config })
            .then(async (value) => {
            console.log("imprimo solo el value q retorna");
            console.log(value);
            console.log("Imprimo lo que sair devuelve:");
            console.log(value.data);
            return await this.mapSaitStatus(value.data);
        }).catch(reason => {
            console.log(reason);
            throw reason;
        });
    }
    async mapSaitStatus(data) {
        console.log("Sait estado");
        console.log("estado: ", data.estados);
        console.log("Sait code estado:");
        console.log("codeEstadi: ", data.estadodelivery.codestado);
        data.estadodelivery.estado = await this.getBuspackStatusByAlphanumeric(data.estadodelivery.codestado);
        let addedStatus = [];
        let uniqueStatus = [];
        data.estados.map((estado) => {
            estado.estado = this.getBuspackStatusById(estado.idestado.toString());
            estado.fecha = estado.fecha.slice(0, -7);
            if (addedStatus.indexOf(estado.estado) == -1) {
                addedStatus.push(estado.estado);
                uniqueStatus.push(estado);
            }
        });
        data.estados = [];
        data.estados = uniqueStatus;
        return data;
    }
    getBuspackStatusById(cod) {
        if (cod === '349') {
            return 'Procesando su pedido';
        }
        else if (cod === '342' || cod === '344' || cod === '345' || cod === '348') {
            return 'En sucursal de destino';
        }
        else if (cod === '347' || cod === '343') {
            return 'Entregado';
        }
        else if (cod === '346') {
            return 'En distribucion';
        }
        else if (cod === '338') {
            return 'En Agencia Origen';
        }
        else
            return 'En camino';
    }
    async getBuspackStatusByAlphanumeric(cod) {
        if (cod === 'ARC_HUB') {
            return 'Procesando su pedido';
        }
        else if (cod === 'DAM_HUB' || cod === 'DNE_HUB' || cod === 'DA1_HUB' || cod === 'NED_HUB') {
            return 'En sucursal de destino';
        }
        else if (cod === 'DED_HUB' || cod === 'DEM_HUB') {
            return 'Entregado';
        }
        else if (cod === 'DRA_HUB') {
            return 'En distribucion';
        }
        else if (cod === 'ORA_HUB') {
            return 'En Agencia Origen';
        }
        else
            return 'En camino';
    }
    async getCustomerAccountByCuil(code, token) {
        const url = new URL([this.saitUrl, this.cuitUrl].join('/'), this._urlSait);
        url.searchParams.append('token', token);
        url.searchParams.append('codigo', code);
        return this.http.get(url.href).toPromise().then(async (value) => {
            if (value.data.registros.length > 0) {
                var bd_accounts = await this.acountService.getAccountByCuit(value.data.registros[0]['cuit']);
                var excluded_accounts = [];
                value.data.registros.map((account) => {
                    bd_accounts.map((bd_account) => {
                        if (account.identidadcliente == bd_account.idClientEntity) {
                            excluded_accounts.push(account);
                        }
                    });
                });
                value.data.registros = value.data.registros.filter(x => !excluded_accounts.includes(x));
                return value.data;
            }
            else {
                return [];
            }
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    }
};
ServicesSaitService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [axios_1.HttpService, account_service_1.AccountService])
], ServicesSaitService);
exports.ServicesSaitService = ServicesSaitService;
//# sourceMappingURL=services-sait.service.js.map