import { Injectable } from '@nestjs/common';
import { HttpService  } from '@nestjs/axios';
import {
    SaitResponseAuthInterface, SaitResponseInterface, SaitResponseStatusDeliveryInterface,
    SaitResponseUploadInterface,
    SaitResponseValidateInterface, SaitResponseValidationResultInterface
} from "./interfaces/index";
import {SaitAuthDto} from "./dto/sait-auth.dto";
import {SaitUrlEnum} from "./enums/sait-url.enums";
import { createReadStream } from 'fs';
import { AccountService } from "../account/account.service";

@Injectable()
export class ServicesSaitService {
    private readonly _saitCredential: SaitAuthDto = null;
    private readonly _urlSait: string = "";
    private  _token: string = "";
    private saitUrl =  "sait";
    private cuitUrl = "clienteCuentaCorriente";

    constructor(private readonly http: HttpService, private readonly acountService: AccountService) {
        this._saitCredential = new SaitAuthDto();
        this._saitCredential.usuario = process.env.SAIT_USER;
        this._saitCredential.password = process.env.SAIT_USER_PASSWORD;
        this._urlSait = process.env.SAIT_BASE_URL;
    }
    
    public async saitAccessToken() : Promise<any> {

        let _ax = this.http.axiosRef;
        return await _ax.post(
            this._urlSait + SaitUrlEnum.AUTH,
            "usuario="+this._saitCredential.usuario+"&password="+this._saitCredential.password)
            .then(value => {
                    console.log(this._saitCredential.usuario);
                    console.log(this._saitCredential.password);
                    console.log(value.status);
                    console.log(value.data);
		    return value.data as SaitResponseAuthInterface;
            }).catch(reason => {
                console.log(reason)
                throw reason;
            })
    }

    public async saitFileUpload2(filepath: string, token:string) : Promise<any> {
        try {
            const { Curl } = require('node-libcurl');

            const curl = new Curl();
            const close = curl.close.bind(curl);

            curl.setOpt(Curl.option.URL, this._urlSait + SaitUrlEnum.UPLOAD);
            curl.setOpt(Curl.option.HTTPHEADER,[`token: ${token}`]);
            curl.setOpt(Curl.option.HTTPPOST, [
                { name: 'pfile', file: filepath, type: 'file' }
            ]);

            let self=this;

           curl.on("end", function (statusCode, data, headers) {

                const myData = JSON.parse(data); 
                console.log(myData.idarchivo);
                console.info("***");
                console.info("Total time taken: " + this.getInfo("TOTAL_TIME"));
                self.saitValidate(myData.idarchivo,token);
                this.close();
            });

           curl.on('error', function (error, errorCode) {
                console.error(error, errorCode);
                this.close();
            })
            curl.perform();

        } catch (e) {
            console.log("error trycatch");
            console.log(e);
        }
    }

    public async saitFileUpload(filepath: string, token:string) : Promise<any> {
        try {
            

            const { curly } = require('node-libcurl');
            const { statusCode, data, headers } = await curly.post(
            this._urlSait + SaitUrlEnum.UPLOAD,
            {
              HTTPPOST: [
                {
                  name: "pfile",
                  file: filepath,
                  type: "file",
                },
              ],
              httpHeader: [`token: ${token}`],
            }
          );
	  console.log(statusCode);
	  console.log(data);
          return data as SaitResponseUploadInterface;
        
        } catch (e) {
            console.log("error trycatch");
            console.log(e);
        }
    }

    public async saitValidate(idarchivo:string, token:string) : Promise<any> {

        const config = {
            "token": token
        };

        let _ax = this.http.axiosRef;
        return await  _ax.get(
            this._urlSait + SaitUrlEnum.VALIDATE+`?idarchivo=${idarchivo}`,
            {headers: config} )
            .then(value => {
                console.log(value.data);
                return value.data as SaitResponseValidateInterface;
            }).catch(reason => {
                console.log(reason)
                throw reason;
            })
    }

    public async saitValidationResult(idarchivo:string, token:string) : Promise<any> {
        const config = {
            "token": token
        };

        let _ax = this.http.axiosRef;
        return await  _ax.get(
            this._urlSait + SaitUrlEnum.VALIDATION_RESULT+`?idarchivo=${idarchivo}`,
            {headers: config} )
            .then(response => {
               /* console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                console.log(response.request);*/
                return response.data as SaitResponseValidationResultInterface;
                
            }).catch(reason => {
                console.log(reason)
                throw reason;
            })
    }

    public async saitProcess(idarchivo:string, token:string) : Promise<any> {

        const config = {
            "token": token
        };

        let _ax = this.http.axiosRef;
        return await  _ax.post(
            this._urlSait + SaitUrlEnum.PROCESS,
            "idarchivo="+idarchivo,
             {headers: config}  )
            .then(value => {
                return value.data as SaitResponseInterface;
            }).catch(reason => {
                console.log(reason)
                throw reason;
            })
    }

    public async saitProcessResult(idarchivo:string, token:string) : Promise<any> {

        const config = {
            "token": token
        };

        let _ax = this.http.axiosRef;
        return await  _ax.get(
            this._urlSait + SaitUrlEnum.PROCESS_RESULT+`?idarchivo=${idarchivo}`,
            {headers: config} )
            .then(value => {
                return value.data as SaitResponseValidationResultInterface;
            }).catch(reason => {
                console.log(reason)
                throw reason;
            })
    }

    public async saitStatus(idarchivo:string, token:string) : Promise<any> {

        const config = {
            "token": token
        };

        let _ax = this.http.axiosRef;
        return await  _ax.get(
            this._urlSait + SaitUrlEnum.STATUS+`?idarchivo=${idarchivo}`,
            {headers: config} )
            .then(value => {
                return value.data as SaitResponseStatusDeliveryInterface;
            }).catch(reason => {
                console.log(reason)
                throw reason;
            })
    }

    public async saitDeliveryStatus(numero:string, token:string) : Promise<any> {

        console.log("entre a saitDeliveryStatus linea 204 services-sait.services.ts")
        const config = {
            "token": token
        };

        let _ax = this.http.axiosRef;
        return await  _ax.get(
            this._urlSait + SaitUrlEnum.DELIVERY_STATUS+`?numero=${numero}`,
            {headers: config} )
            .then(async value => {
                console.log("Imprimo lo que sair devuelve:")
                console.log(value.data) 
                return await this.mapSaitStatus(value.data);
            }).catch(reason => {
                console.log(reason)
                throw reason;
            })
    }

    public async mapSaitStatus(data){
        console.log("Sait estado")
        console.log("estado: ", data.estados);
        console.log("Sait code estado:")
        console.log("codeEstadi: ", data.estadodelivery.codestado);
        data.estadodelivery.estado = await this.getBuspackStatusByAlphanumeric(data.estadodelivery.codestado);
        let addedStatus = [];
        let uniqueStatus = [];
        data.estados.map((estado) => {
            estado.estado = this.getBuspackStatusById(estado.idestado.toString());
            estado.fecha = estado.fecha.slice(0, -7);
            
            if(addedStatus.indexOf(estado.estado) == -1){
                addedStatus.push(estado.estado);
                uniqueStatus.push(estado);
            }            
        });
        data.estados = [];
        data.estados = uniqueStatus;
        // console.log("BUSPACK: ", data.estados);
        return data as SaitResponseStatusDeliveryInterface;
        
    }

    public getBuspackStatusById(cod: string){
        if (cod === '349'){
            return 'Procesando su pedido'
        }
        else if (cod === '342' || cod === '344' || cod === '345' || cod === '348'){
            return 'En sucursal de destino'
        }
        else if (cod === '347' || cod === '343'){
            return 'Entregado'
        }
        else if (cod === '346'){
            return 'En distribucion'
        }
        else if (cod === '338'){
            return 'En Agencia Origen'
        }
        else return 'En camino'
    }

    public async getBuspackStatusByAlphanumeric(cod: string): Promise<string>{
        if (cod === 'ARC_HUB'){
            return 'Procesando su pedido'
        }
        else if (cod === 'DAM_HUB' || cod === 'DNE_HUB' || cod === 'DA1_HUB' || cod === 'NED_HUB'){
            return 'En sucursal de destino'
        }
        else if (cod === 'DED_HUB' || cod === 'DEM_HUB'){
            return 'Entregado'
        }
        else if (cod === 'DRA_HUB'){
            return 'En distribucion'
        }
        else if (cod === 'ORA_HUB'){    // Procedo a agregar nuevo codigod e referencia de SAIT
            return 'En Agencia Origen'
        }
        else return 'En camino'
    }

    public async getCustomerAccountByCuil(code:string, token:string): Promise<any> {
        const url = new URL([this.saitUrl, this.cuitUrl].join('/'), this._urlSait);
        url.searchParams.append('token', token);
        url.searchParams.append('codigo',code);
        return this.http.get(url.href).toPromise().then(async (value)=>{
            if (value.data.registros.length > 0){
                var bd_accounts = await this.acountService.getAccountByCuit(value.data.registros[0]['cuit']);

                var excluded_accounts = [];

                value.data.registros.map( (account)=>{
                    bd_accounts.map( (bd_account)=>{
                        if(account.identidadcliente == bd_account.idClientEntity){
                            excluded_accounts.push(account);
                        }
                    });
                })

                value.data.registros = value.data.registros.filter(x => !excluded_accounts.includes(x));

                return value.data;
            } else {
                return [];
            }
            
        }).catch((error)=>{
            console.log(error);
            throw error;
        })

    }
}
