import {
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common";
import { join } from "path";
import { readdirSync, writeFileSync, readFileSync,createReadStream,createWriteStream } from "fs";
import messages from "../../shared/config/strings-constants";
import { FindManyOptions, LessThanOrEqual, Like, MoreThanOrEqual, Raw, Repository, IsNull, Not, Between } from  "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { utils, writeFile, readFile } from "xlsx";
import { ServiceRequestEntity } from "./entities/service-request.entity";
import { AccountEntity } from "../account/entities/account.entity";
import { QueryServiceRequestDto } from "./dtos";
import { ServicesSaitService } from "../services-sait/services-sait.service";
import { SaitResponseInterface, SaitResponseStatusDeliveryInterface, SaitResponseUploadInterface, SaitResponseValidateInterface, SaitResponseValidationResultInterface } from "../services-sait/interfaces";
import { SaitRequestDto } from "../services-sait/dto/sait-request.dto";
import { GeneralSettingsEntity } from "../general-settings/entities/general-settings.entity";
import { TariffEntity } from "../user/entities/tariff.entity";
import { ZonesEntity } from "../enabled-places/entities/zonescp.entity";
import { LocalityEntity } from "../enabled-places/entities/location.entity";
import { EnabledPlaceEntity } from "../enabled-places/entities/enabled-places.entity";
import moment = require('moment');
import { LabelServiceRequestDto } from "./dtos/label-service-request.dto";
import { Cron } from '@nestjs/schedule';
import { CreateFormatServiceRequestDto } from "./dtos/format-service-request/create-format-service-request.dto";
import FormatServiceRequestEntity from "./entities/format-sr.entity";
import RequestFieldsDto from "./dtos/format-service-request/create-request-fields.dto";
import FieldNumberEntity from "./entities/field-number-sr.entity";
import FieldBooleanEntity from "./entities/field-boolean-sr.entity";
import FieldStringEntity from "./entities/field-string-sr.entity";
import { numberFields, stringFields } from "../../shared/datatype-fields"
import SpreadsheetReaderStrategy from "./helpers/sr-file-reader.ts/spreadsheet-reader-strategy";
import CsvReaderStrategy from "./helpers/sr-file-reader.ts/csv-reader-strategy";
import SRFileReaderAbstractStrategy from "./helpers/sr-file-reader.ts/sr-file-reader-abstract-strategy";
import { TEMPLATE_FILES_DIR } from "src/shared/constants";
import AccountLocalityEntity from "./entities/account-locality.entity";
import LocalityFormatFileReader from "./helpers/locality-format-file-reader";
import LocalityToFormatValidator from "./helpers/validators/locality-to-format-validator";
import { formatLocalityError } from "./helpers/format-locality-error";
import FormatEnabledPlaceFinder from "./helpers/enabled-place-finder/format-enabled-place-finder";
import DuplicateLocalityEntriesChecker from "./helpers/duplicate-locality-entries-checker";
import EntityFieldToFsrMapper from "./helpers/entity-field-to-fsr-mapper";
import DefaultServiceRequestValidator from "./helpers/validators/default-service-request-validator";
import FormatServiceRequestValidator from "./helpers/validators/format-service-request-validator";
import { dtvDefaultSr } from "./helpers/data-to-validate-default-sr";
import DefaultEnabledPlaceFinder from "./helpers/enabled-place-finder/default-enabled-place-finder";
import { enabledPlacesAccountLocalityMapper } from "./helpers/enabled-place-account-locality-mapper";
import FormatSrPositionsValidator from "./helpers/validators/format-sr-positions-validator";
import UpdateFsrValidator from "./helpers/validators/update-fsr-validator";
import NumberFieldTransformer from "./helpers/numeric-field-transformer";
import fs from 'fs';
import { CONNREFUSED } from "dns";
import PlanillaExcelEntity from "./entities/planilla_excel.entity";
import { Console } from "console";

@Injectable()
export class ServiceRequestService {

  private error: boolean;
  private srFileReader: SRFileReaderAbstractStrategy;
  private localityToFormatValidator: LocalityToFormatValidator;

  constructor(
    @InjectRepository(ServiceRequestEntity)
    private serviceRequestRepository: Repository<ServiceRequestEntity>,
    @InjectRepository(GeneralSettingsEntity)
    private readonly generalSettingsRepository: Repository<GeneralSettingsEntity>,
    @InjectRepository(TariffEntity)
    private readonly tariffRepository: Repository<TariffEntity>,
    @InjectRepository(ZonesEntity)
    private readonly zonesRepository: Repository<ZonesEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(LocalityEntity)
    private readonly localityRepository: Repository<LocalityEntity>,
    @InjectRepository(EnabledPlaceEntity)
    private readonly enabledPlaceRepository: Repository<EnabledPlaceEntity>,
    @InjectRepository(FormatServiceRequestEntity)
    private readonly formatSrRepository: Repository<FormatServiceRequestEntity>,
    @InjectRepository(FieldNumberEntity)
    private readonly fieldNumberRepositoty: Repository<FieldNumberEntity>,
    @InjectRepository(FieldStringEntity)
    private readonly fieldStringRepository: Repository<FieldStringEntity>,
    @InjectRepository(FieldBooleanEntity)
    private readonly fieldBooleanRepository: Repository<FieldBooleanEntity>,
    @InjectRepository(AccountLocalityEntity)
    private readonly accountLocalityRepository: Repository<AccountLocalityEntity>,
    @InjectRepository(PlanillaExcelEntity)
    private readonly planillaExcelRepository: Repository<PlanillaExcelEntity>,
    private readonly serviceSaitService: ServicesSaitService,
    private readonly formatEnabledPlaceFinder: FormatEnabledPlaceFinder,
    private readonly defaultEnabledPlacesFinder: DefaultEnabledPlaceFinder,
    private readonly defaultSrValidator: DefaultServiceRequestValidator,
    private readonly fsrValidator: FormatServiceRequestValidator,
    private readonly updateFsrValidator: UpdateFsrValidator
  ) { }

  public async downloadFile() {
    
        let results = await this.planillaExcelRepository.findOne();
    
        if (results.excel.length > 0) {
          const base64Data = results.excel;
          const binaryData = Buffer.from(base64Data, 'base64');
    
          return binaryData;
        }
      } 

  public async getAll() {
    return await this.serviceRequestRepository.find();
  }

  // @Cron('0 */30 * * * *')
  public async updateRequests() {
    const { token } = await this.serviceSaitService.saitAccessToken();
    let requests = await this.serviceRequestRepository.find(
      {
        where:
        {
          delivery: Not(IsNull()),
          status: Not("Entregado"),
        }
      }
    );
    for (let i = 0; i < requests.length; i++) {
      let request = requests[i];
      let delivery: SaitResponseStatusDeliveryInterface = await this.serviceSaitService.saitDeliveryStatus(request.voucher, token);
      if (delivery.mensaje === "Correcto") {
        if (request.status != delivery.estadodelivery['estado']) {
          request.status = delivery.estadodelivery['estado'];
          await this.serviceRequestRepository.save(request);
        }
      }
    }
  }

  public async updateRequestsBetweenDates(fromDate: string , toDate: string, account: AccountEntity) {
    console.log("entro a actualizar")

    const { token } = await this.serviceSaitService.saitAccessToken();


    const dateStringFrom =  fromDate;
    const dateObjectFrom = new Date(dateStringFrom);
    dateObjectFrom.setHours(0, 0, 0, 0);

    let dateStringToDate =  toDate;
    const dateObjectToDate = new Date(dateStringToDate);
    dateObjectToDate.setHours(23, 0, 0, 0);

    console.log(dateObjectFrom,dateObjectToDate)


    

    let requests = await this.serviceRequestRepository.find(
      {
        where:
        {
          delivery: Not(IsNull()),
          status: Not("Entregado"),
          createdAt: Between(dateObjectFrom, dateObjectToDate),
          account : account
        }
      }
    );

    
    console.log("ya tengo todo de la BD")
    console.log(requests.length)
    for (let i = 0; i < requests.length; i++) {
      console.log(1)
      let request = requests[i];
      console.log(request.voucher)
      let delivery: SaitResponseStatusDeliveryInterface = await this.serviceSaitService.saitDeliveryStatus(request.voucher, token);
      console.log("consulte uno a sait")
      //console.log(delivery.numero)
      //console.log("ESTADO DE SAIT:")
      //console.log(delivery.estadodelivery['estado'])
      //console.log(delivery.estado)
      

      if (delivery.mensaje === "Correcto") {
        //console.log("mensaje CORRECTO -> Procedo")
        //console.log(request.voucher)
        console.log(request.status)
        console.log(delivery.estadodelivery['estado'])
        if (request.status != delivery.estadodelivery['estado']) {
          request.status = delivery.estadodelivery['estado'];
          await this.serviceRequestRepository.save(request)
        }
      }
      console.log("Siguiente")
    }
  }

  public async getByRequestIdVoucherAndDelivery(requestId: string, voucher: string, delivery: string, account: AccountEntity, dateFrom: string, dateTo: string) {

    try {

      if( dateFrom !="" && dateTo != ""){

        const dateStringFrom =  dateFrom;
        const dateObjectFrom = new Date(dateStringFrom);
        dateObjectFrom.setHours(0, 0, 0, 0);
    
        let dateStringToDate =  dateTo;
        const dateObjectToDate = new Date(dateStringToDate);
        dateObjectToDate.setHours(23, 0, 0, 0);

        let myQuery = {
          where: {
            account: account,
            requestId: requestId,
            voucher: voucher,
            createdAt : Between(dateObjectFrom, dateObjectToDate),
            delivery: Like(`%${delivery}%`),
          }
        };

        let query = {
          where: {
            account: account
          }
        };
  
        if (requestId === "") {
          delete myQuery.where.requestId;
        }
  
        if (voucher === "") {
          delete myQuery.where.voucher;
        }
  
        if (delivery === "") {
          delete myQuery.where.delivery;
        }

        const serviceRequestArray = await this.serviceRequestRepository.find(myQuery);

        // Concatenar los valores para formar la dirección completa
        const fullAddress = `${account.addressStreet} ${account.addressNumber}, ${account.locality}`;


        const filteredArray = serviceRequestArray.filter(element => element.voucher !== null);

        // creo un array de piezas por cada solicitud
  
        const LabelResponse: LabelServiceRequestDto[] = [];
  
        filteredArray.forEach(element => {
  
          // me fijo en delivery y creo array
  
          const myElement = element;
  
          const delivery = element.delivery;
          const deliveryArray = delivery.split(";");
  
          deliveryArray.forEach(piece => {
  
            let labelReturn = new LabelServiceRequestDto();
  
            labelReturn.pieceId = piece;
            labelReturn.recipientFullname = myElement.recipientFullname;
            labelReturn.address = myElement.addressStreet + " " + (myElement.addressNumber == null ? "" : myElement.addressNumber) + " " + (myElement.addressBuilding == null ? "" : myElement.addressBuilding) + " " + (myElement.addressFloor == null ? "" : myElement.addressFloor) + " " + (myElement.addressApartment == null ? "" : myElement.addressApartment);
            labelReturn.cpa = myElement.cpa;
            labelReturn.city = myElement.locality;
            labelReturn.province = myElement.province;
            labelReturn.requestId = myElement.requestId;
            labelReturn.shipping = myElement.homeDelivery ? "Entrega en domicilio" : "Entrega en sucursal",
            labelReturn.voucher = myElement.voucher;
            labelReturn.status = myElement.status;
            labelReturn.observations = myElement.observations;
            labelReturn.phone = myElement.phone; 
            labelReturn.origin = fullAddress;

            LabelResponse.push(labelReturn);
          });
        });
        return LabelResponse;

      }else{
            
      let myQuery = {
        where: {
          account: account,
          requestId: requestId,
          voucher: voucher,

          delivery: Like(`%${delivery}%`),
        }
      };

      if (requestId === "") {
        delete myQuery.where.requestId;
      }

      if (voucher === "") {
        delete myQuery.where.voucher;
      }

      if (delivery === "") {
        delete myQuery.where.delivery;
      }

      const serviceRequestArray = await this.serviceRequestRepository.find(myQuery);

      const filteredArray = serviceRequestArray.filter(element => element.voucher !== null);

      // Concatenar los valores para formar la dirección completa
      const fullAddress = `${account.addressStreet} ${account.addressNumber}, ${account.locality}`;

      const LabelResponse: LabelServiceRequestDto[] = [];

      filteredArray.forEach(element => {

        // me fijo en delivery y creo array

        const myElement = element;

        const delivery = element.delivery;
        const deliveryArray = delivery.split(";");

        deliveryArray.forEach(piece => {

          let labelReturn = new LabelServiceRequestDto();

          labelReturn.pieceId = piece;
          labelReturn.recipientFullname = myElement.recipientFullname;
          labelReturn.address = myElement.addressStreet + " " + (myElement.addressNumber == null ? "" : myElement.addressNumber) + " " + (myElement.addressBuilding == null ? "" : myElement.addressBuilding) + " " + (myElement.addressFloor == null ? "" : myElement.addressFloor) + " " + (myElement.addressApartment == null ? "" : myElement.addressApartment);
          labelReturn.cpa = myElement.cpa;
          labelReturn.city = myElement.locality;
          labelReturn.province = myElement.province;
          labelReturn.requestId = myElement.requestId;
          labelReturn.shipping = myElement.homeDelivery ? "Entrega en domicilio" : "Entrega en sucursal",
          labelReturn.voucher = myElement.voucher;
          labelReturn.status = myElement.status;
          labelReturn.observations = myElement.observations;
          labelReturn.phone = myElement.phone;
          labelReturn.origin = fullAddress;

          LabelResponse.push(labelReturn);
        });
      });
      return LabelResponse;

    }


    } catch (error) {
      throw new Error(error);
    }
  }


  public async getByQuery(requestId: string, voucher: string, delivery: string, fromDate: string, toDate: string, account: AccountEntity) {

    try {
      let myQuery: any = { where: { account: account } };
      const formattedFromDate = new Date(fromDate);
      const formattedToDate = new Date(toDate);
      // newDate truncate hour min sec
      formattedFromDate.setHours(0);
      formattedFromDate.setMinutes(0);
      formattedFromDate.setSeconds(0);
      formattedToDate.setHours(23);
      formattedToDate.setMinutes(59);
      formattedToDate.setSeconds(59);
      if (requestId) {
        myQuery.where.requestId = requestId;
      }
      if (voucher) {
        myQuery.where.voucher = voucher;
      }
      if (delivery) {
        myQuery.where.delivery = Like(`%${delivery}%`);
      }
      if (formattedFromDate.toString() !== 'Invalid Date' && formattedToDate.toString() !== 'Invalid Date') {
        myQuery.where.createdAt = Raw(
          (alias) => `${alias} >= :fromDate and ${alias} <= :toDate`,
          {
            fromDate: formattedFromDate.toISOString(),
            toDate: formattedToDate.toISOString()
          }
        );
      } else {
        if (formattedFromDate.toString() !== 'Invalid Date') {
          myQuery.where.createdAt = Raw(
            (alias) => `${alias} >= :fromDate`,
            {
              fromDate: formattedFromDate.toISOString()
            }
          );
        }
        if (formattedToDate.toString() !== 'Invalid Date') {
          myQuery.where.createdAt = Raw(
            (alias) => `${alias} <= :toDate`,
            {
              toDate: formattedToDate.toISOString()
            }
          );
        }
      }
      const serviceRequestArray = await this.serviceRequestRepository
        .find(myQuery);

      const QueryResponse: QueryServiceRequestDto[] = [];
      serviceRequestArray.forEach(element => {
        let queryReturn = new QueryServiceRequestDto();
        let addressNumber = element.addressNumber;
        if (addressNumber == null) addressNumber = '';
        let address = `${element.addressStreet} ${addressNumber}`;
        queryReturn.createdAt = moment(element.createdAt).format("DD/MM/YY");
        queryReturn.requestId = element.requestId;
        queryReturn.recipientFullname = element.recipientFullname;
        queryReturn.address = (address == ' null' ? "" : address);
        queryReturn.cpa = element.cpa;
        queryReturn.city = element.locality;
        queryReturn.province = element.province;
        queryReturn.caja = element.qtyPieces;
        queryReturn.envio = element.homeDelivery ? "Entrega en domicilio" : "Entrega en sucursal",
          queryReturn.voucher = element.voucher;
        queryReturn.estado = element.status;
        queryReturn.pieceId = element.delivery;

        QueryResponse.push(queryReturn);
      });
      return QueryResponse;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async uploadFile(file: any, account: AccountEntity, isStandardFormat: boolean) {
    const accountId = account.id;

    const formatSr: FormatServiceRequestEntity = await this.formatSrRepository.findOne({
      where: { accountId: accountId }
    });

    let readFileOptions = {};
    let rawData = null;
    let res = null

    try {
      if (!isStandardFormat) {
        if (!formatSr) throw new Error("El administrador no ha creado un formato personalidado para cargar aún");
        const formatSrId = formatSr.id;

        // obtengo todos los campos de los distintos tipo de la solicitud y luego los mapeo a una
        // lista de json {fieldname: .., position: ..}
        const stringFields = await this.getStringFields(formatSrId);
        const numberFields = await this.getNumberFields(formatSrId);
        const booleanFields = await this.getBooleanFields(formatSrId);
        const fieldnamesPositions = this.getFieldnamesPositions(stringFields, numberFields, booleanFields);

        // data to validate
        const dtv = { stringFields, numberFields, booleanFields };
        const format = formatSr.format;
        const quoteChar = formatSr.quoteChar;
        readFileOptions["isThereAFsr"] = true;

        if (format === "xls") {
          this.srFileReader = new SpreadsheetReaderStrategy();
          readFileOptions["separator"] = null;
        } else {
          this.srFileReader = new CsvReaderStrategy();
          const separator = formatSr.separator
          readFileOptions["separator"] = separator;
          readFileOptions["quoteChar"] = quoteChar;
          readFileOptions["filePath"] = file.path;
        }

        const rawData = await this.srFileReader.readFile(file, readFileOptions, fieldnamesPositions);
        res = await this.fsrValidator.validate(rawData, account, dtv, true);

        const accountLocalities = await this.accountLocalityRepository.find({
          where: { accountId: accountId }
        });

        const epDtv = this.getEpDtv(dtv.stringFields);

        for (let i = 0; i < res.length; i++) {
          let row = res[i];
          // si no hay errores en los campos localidad, provincia y cpa
          if (!this.epFieldsHaveErrors(row.locality, row.province, row.cpa)) {
              let resWithEnabledPlace = await this.formatEnabledPlaceFinder.find(row.enabledPlace,
                                                                                row.locality,
                                                                                row.province,
                                                                                row.cpa,
                                                                                accountLocalities,
                                                                                epDtv);

              res[i].enabledPlace = resWithEnabledPlace.enabledPlace;
              res[i].province = resWithEnabledPlace.province;
              res[i].cpa = resWithEnabledPlace.cpa;
              res[i].locality = resWithEnabledPlace.locality;
          }
        }
      } else {
        this.srFileReader = new SpreadsheetReaderStrategy();
        readFileOptions = { isThereAFsr: false }
        rawData = await this.srFileReader.readFile(file, readFileOptions);

        res = await this.defaultSrValidator.validate(rawData, account, null, null);
      }

      for(let i = 0; i < res.length; i++) {
        let row = res[i];
        row = await this.validateEPIsCurrentlyEnabled(row);
      }

      for(let i = 0; i < res.length; i++) {
        let row = res[i];
        row = await this.validateTotalWeightAndQtyPiecesOnTariff(row, account)
      }

      res = this.roundNumericFields(res);

      return res;
    } catch(e) {
      console.log(e.message);
      throw new Error("Hubo un error al procesar el archivo.\n Asegúrese de que su archivo se corresponda con el metodo elegido, que los datos de las columnas coincidan con los valores de la misma y que no haya errores de formato.");
    }
  }

  private async validateTotalWeightAndQtyPiecesOnTariff(row: any, account) {
    const totalWeight = row.totalWeight;
    const qtyPieces = row.qtyPieces;

    if (totalWeight.status === "ok" && qtyPieces.status === "ok") {
      await this.tariffRepository.find({
        where: {
          account: account,
          weightFrom: LessThanOrEqual(totalWeight.value / qtyPieces.value),
          weightTo: MoreThanOrEqual(totalWeight.value / qtyPieces.value)
        },
      }).then(tariff => {
        if (tariff.length == 0) {
          console.log("No existe peso: ", totalWeight.value / qtyPieces.value);
          totalWeight.error = "Error en Tarifario, consultar area Comercial";
          totalWeight.status = "danger";
          this.error = true;
        }
      });
    }

    row.totalWeight = totalWeight;
    row.qtyPieces = qtyPieces

    return row
  }

  private getEpDtv(stringFields: any[]) {
    return stringFields.filter(sf => sf.fieldName === "province" || sf.fieldName === "locality" || sf.fieldName === "cpa");
  }

  private epFieldsHaveErrors(locality: any, province: any, cpa: any) {
    return locality.status === "danger" || province.status === "danger" || cpa.status === "danger"
  }

  private roundNumericFields(srFileResult: any[]): any {
    srFileResult.forEach(sr => {
      let totalWeight = sr.totalWeight;

      if (totalWeight.status === "ok") {
        totalWeight.value = Math.round(totalWeight.value);
        sr.totalWeight = totalWeight;
      }
    })

    return srFileResult;
  }

  private async validateEPIsCurrentlyEnabled(row: any) {
    let enabledPlace = row.enabledPlace;
    let locality = row.locality;
    let province = row.province;
    let cpa = row.cpa;

    if (row.homeDelivery.value === "NO") {
      // si el lugar habilitado esta ok valido cpa
      if (enabledPlace.status == "ok" && cpa.status == "ok") {
        await this.localityRepository.find({
          where: {
            enabled_place: enabledPlace.value,
          },
        }).then(place => {
          if (place.length == 0) {
            enabledPlace.status = "danger";
            enabledPlace.error = "Este lugar no esta actualmente habilitado";

            locality.status = "danger";
            locality.error = "La localidad no pertence a un lugar habilitado";

            province.status = "danger";
            province.error = "La provincia no pertence a un lugar habilitado";

            cpa.status = "danger";
            cpa.error = "El codigo Postal no pertence a un lugar habilitado";

            this.error = true;
          } else {
            if (place[0].zip_code != cpa.value) {
              cpa.status = "danger";
              cpa.error = "El codigo Postal no pertence a un lugar habilitado";
              this.error = true;
            }
          }
        });
      }
    } else {
      // Si es entrega a domicilio
      await this.localityRepository.find({
        where: {
          zip_code: row.addressCpa.value,
        },
      });
    }

    row.enabledPlace = enabledPlace;
    row.locality = locality;
    row.cpa = cpa;
    row.province = province;

    return row;
  }

  private async getStringFields(formatSrId: number) {
    return this.fieldStringRepository
      .createQueryBuilder("sf")
      .innerJoinAndSelect(FormatServiceRequestEntity, "fsr", "sf.format_sr_id = fsr.id")
      .where("sf.format_sr_id = :formatSrId", { formatSrId: formatSrId })
      .getMany();
  }

  private async getNumberFields(formatSrId: number) {
    return this.fieldNumberRepositoty
      .createQueryBuilder("nf")
      .innerJoinAndSelect(FormatServiceRequestEntity, "fsr", "nf.format_sr_id = fsr.id")
      .where("nf.format_sr_id = :formatSrId", { formatSrId: formatSrId })
      .getMany();
  }

  private async getBooleanFields(formatSrId: number) {
    return this.fieldBooleanRepository
      .createQueryBuilder("bf")
      .innerJoinAndSelect(FormatServiceRequestEntity, "fsr", "bf.format_sr_id = fsr.id")
      .where("bf.format_sr_id = :formatSrId", { formatSrId: formatSrId })
      .getMany();
  }

  getFieldnamesPositions(fieldStringRows: any, fieldNumberRows: any, fieldBooleanRows: any): any[] {
    // fpsr = fieldname position string row
    const fpsr = fieldStringRows.map(r => ({ fieldname: r.fieldName, position: r.position }));
    const fpnr = fieldNumberRows.map(r => ({ fieldname: r.fieldName, position: r.position }));
    const fpbr = fieldBooleanRows.map(r => ({ fieldname: r.fieldName, position: r.position }));

    return fpsr.concat(fpnr).concat(fpbr).filter(r => r.position !== null);
  }

  /**
   * Devuelve true si no hay ningun error status es danger para los parametros pasados
   */
  getAreValidFieldsToGetEP(localityErrorStatus: string, provinceErrorStatus: string, cpaErrorStatus: string): boolean {
    var res = false;
    var errorStatusDangerCount = 0

    if (localityErrorStatus === "danger") errorStatusDangerCount++;
    if (provinceErrorStatus === "danger") errorStatusDangerCount++;
    if (cpaErrorStatus === "danger") errorStatusDangerCount++;

    if (errorStatusDangerCount < 2) res = true;
    return res;
  }

  public validateAttributte(value: any, type: string, empty: boolean = false) {
    let error = "";
    let status = "ok";


    const attr = { value: value, status: status, error: error };
    if (value == undefined || value === "") {
      value = "";
      if (!empty) {
        attr.error = "Este atributo no puede ser vacio";
        attr.status = "danger";
        attr.value = value
        this.error = true;

        return attr
      }
    }

    const mapTypes = {
      string: 'texto',
      number: 'número'
    }

    if (typeof value !== type && type !== "string" && !empty) {
      attr.status = "danger";
      attr.error = `Este atributo debe ser ${mapTypes[type]}`;
      this.error = true;
    }
    return attr;
  }

  public async createRequest(body, account: AccountEntity, isStandardFormat: string) {
    try {

      this.error = false;

      let createRequest = { qty: 0, detail: "" };
      let errorRequest = { qty: 0, detail: "" };
      let warningRequest = { qty: 0, detail: "" };
      
      let response: any[] = null;

      if (isStandardFormat === "true") {
        response = await this.defaultSrValidator.validate(body, account, null, null);
      } else {
        const accountId = account.id;

        const formatSr: FormatServiceRequestEntity = await this.formatSrRepository.findOne({
          where: {accountId: accountId}
        });

        const formatSrId = formatSr.id;

        let stringFields = await this.getStringFields(formatSrId);
        let numberFields = await this.getNumberFields(formatSrId);
        let booleanFields = await this.getBooleanFields(formatSrId);

        // dtv = data to validate
        const dtv = {stringFields, numberFields, booleanFields};

        response = await this.fsrValidator.validate(body, account, dtv, false);
      }

      for(let i = 0; i < response.length; i++) {
        let row = response[i]
        row = await this.validateEPIsCurrentlyEnabled(row);
      }

      for(let i = 0; i < response.length; i++) {
        let row = response[i]
        row = await this.validateTotalWeightAndQtyPiecesOnTariff(row, account)
      }

      this.error = this.validatedFsrHasErrors(response);

      // Si tengo error en alguna fila devuelvo todo de nuevo para corregir      
      if (this.error) {
        return { "created": false, "data": response };
      }

      // si no hay errores, guardo la solicitud
      const serviceRequest: ServiceRequestEntity[] = [];

      body.forEach(async (row: any) => {
        let myRow: ServiceRequestEntity = row;

        if (row.homeDelivery === "SI") {
          myRow.homeDelivery = true;
        } else if (row.homeDelivery === "NO") {
          myRow.homeDelivery = false;
        }

        if (row.addressNumber === '') {
          myRow.addressNumber = null;
        }

        myRow.account = account;
        serviceRequest.push(this.serviceRequestRepository.create(myRow));
      });

      const generalSettings = await this.generalSettingsRepository.findOne({
        id: 123123123,
      });

      const accountClient = await this.accountRepository.findOne({
        id: account.id,
      });

      let helper; // fila tariff, fila enabled_places

      await this.serviceRequestRepository.save(serviceRequest)
        .then((result) => {
          helper = result.map(row => {
            return { "id": row.id, "requestId": `${row.requestId}` }
          });
        });

      // armo archivo excel para enviar a SAIT
      const saitRequest: SaitRequestDto[] = [];
      await Promise.all(body.map(async (row: ServiceRequestEntity, index: number) => {

        let myRow: SaitRequestDto = new SaitRequestDto();

        // Conexion
        myRow.posicion = 0;
        myRow.codigoexterno = row.requestId;

        // Remitente
        myRow.desc_lugar_origen = generalSettings.descLugarOrigen; //config BD
        myRow.idog_lugar_origen = generalSettings.idLugarOrigen; //config BD

        let addressCpa = row.cpa;
        // si es entrega a domicilio pondre el codigo postal de la direccion
        // if (row.homeDelivery){
        //   addressCpa = row.addressCpa;
        // } else {
        //   addressCpa = row.cpa;
        // }

        // Remitente
        myRow.remitente = accountClient.companyName; //SAIT denominacion
        myRow.rem_tipodoc = "";
        myRow.rem_nrodoc = 0;
        myRow.rem_tel = "";
        myRow.rem_email = ""; // no enviar

        // Destinatario
        myRow.destinatario = row.recipientFullname;
        myRow.des_tipodoc = row.docType;
        myRow.des_nrodoc = row.docNumber;
        myRow.des_tel = row.phone;
        myRow.des_email = row.email;

        // Remitente
        myRow.lr_zona = "";
        myRow.lr_manzana = "";
        myRow.lr_calle = accountClient.addressStreet; // SAIT calle
        myRow.lr_nro = accountClient.addressNumber;  // SAIT nro
        myRow.lr_edificio = accountClient.addressBuilding; // SAIT
        myRow.lr_piso = accountClient.addressFloor; // SAIT
        myRow.lr_dpto = accountClient.addressApartment; // SAIT
        myRow.lr_cp = "";
        myRow.lr_localidad = accountClient.locality; // SAIT localidad
        myRow.lr_provincia = accountClient.province; // SAIT provincia
        myRow.lr_pais = accountClient.country; // SAIT pais

        myRow.id_entrega_domicilio = generalSettings.idEntregaDomicilio; //config BD

        //Destinatario
        myRow.ld_zona = "";
        myRow.ld_manzana = "";
        myRow.ld_calle = row.addressStreet;
        myRow.ld_nro = row.addressNumber;
        myRow.ld_edificio = row.addressBuilding;
        myRow.ld_piso = row.addressFloor;
        myRow.ld_dpto = row.addressApartment;
        myRow.ld_cp = row.cpa;
        myRow.ld_localidad = row.locality;
        myRow.ld_provincia = row.province;
        myRow.ld_pais = "";

        myRow.cantidadpiezas = row.qtyPieces;
        myRow.id_indice_peso = "";

        myRow.idagentecc = accountClient.idClientAgent; //SAIT idagentecliente
        myRow.identidadcc = accountClient.idClientEntity; //SAIT identidadcliente
        myRow.codigocc = accountClient.codeECO; // SAIT codigo
        myRow.descripcioncc = "";
        myRow.cuitcc = accountClient.cuit; // SAIT cuit
        myRow.dimensiones = "";
        myRow.pesodb = "";
        myRow.prioridad = "";
        myRow.peso_total = row.totalWeight
        // Agencia Emisora Comprobante
        myRow.id_agencia_origen = generalSettings.idAgenciaOrigen; //config BD
        myRow.desc_agencia_origen = generalSettings.descAgenciaOrigen; //config BD
        myRow.domicilio_agencia_origen = generalSettings.domicilioAgenciaOrigen; //config BD
        myRow.telefono_agencia_origen = generalSettings.telefonoAgenciaOrigen; //config BD
        myRow.cp_agencia_origen = generalSettings.cpAgenciaOrigen; //config BD
        myRow.cp_agencia_destino = ""; //?
        myRow.id_otros_importes = generalSettings.otrosImportes; //config BD

        // SETEO DE TARIFA EN BASE A TENER O NO UN TARIFARIO CUSTOM
        if (account.hasCustomPricing) {
              const pricing = await this.accountRepository.findOneOrFail({ id: account.id }, { relations: ["pricings"] })
                .then(account => {
                  if (!account.pricings || account.currentPricing() === null) {
                    this.error = true;
                  }
                  return account.currentPricing();
                });

              if (this.error) {
                errorRequest.qty = errorRequest.qty + 1;
                this.error = false;
                errorRequest.detail = errorRequest.detail.concat(`- Fila ${index + 1}: ${account.companyName} no tiene un tarifario creado o vigente\n`)
                return;
              }

              // Destino
              const placeArray = await this.enabledPlaceRepository.find({
                where: {
                  place_name: row.enabledPlace,
                },
              });          
              if (placeArray.length === 0) {
                errorRequest.qty = errorRequest.qty + 1;
                errorRequest.detail = errorRequest.detail.concat(`- Fila ${index + 1}: El enabled place ${row.enabledPlace} no fue encontrado o no esta activo.\n`)
                return;
              }

              const enabledPlace = placeArray[0];

              myRow.idog_lugar_destino = parseInt(placeArray[0].idog); // se saca de BD Enabled Places
              myRow.desc_lugar_destino = row.enabledPlace; // enabled places

              const area = pricing.getAreaFromEnabledPlace(enabledPlace);

              if (area === null ) {
                errorRequest.qty = errorRequest.qty + 1;
                errorRequest.detail = errorRequest.detail.concat(`- Fila ${index + 1}: ${enabledPlace.place_name} con idog ${enabledPlace.idog} no fue encontrado en el tarifario personalizado de ${account.companyName}\n`)
                return ;
              }

            const desiredWeight = row.totalWeight / row.qtyPieces; // esto es el peso RESULTANTE QUE VA A BUSCAR AL TARIFARIO
            const pricingRow = area.getPriceRowFrom(desiredWeight);
            if (pricingRow === null ) {
              errorRequest.qty = errorRequest.qty + 1;
              errorRequest.detail = errorRequest.detail.concat(`- Fila ${index + 1}: No se ha encontrado un precio para el peso en el tarifario personalizado de ${account.companyName}\n`)
              return ;
            }

            myRow.valor_declarado = 0; // va cero
            myRow.id_seguro = generalSettings.idSeguro; //config BD
            myRow.seguro = pricingRow.insurance * row.qtyPieces; //Tarifario
            myRow.letra_comprobante = generalSettings.letraComprobante; //config BD
            myRow.boca_comprobante = generalSettings.bocaComprobante; //config BD

            const tarifa = pricingRow.basePrice;
            // Tarifas
            myRow.valor_flete = tarifa * row.qtyPieces;
            myRow.valor_com_c_imp = tarifa * row.qtyPieces;
            myRow.valor_com_s_imp = this.round((tarifa * row.qtyPieces) / 1.21);

            // Tarifa
            myRow.retiro_a_domicilio = 0;
            myRow.idretiro_a_domicilio = generalSettings.idRetiroADomicilio; //config BD
            myRow.valor_retiro_domicilio = pricingRow.homeWithdrawal * row.qtyPieces;

            // Tarifa
            if (row.homeDelivery) {
              myRow.envio_domicilio = 1;
              myRow.valor_entrega_domicilio = pricingRow.homeDelivery * row.qtyPieces; // valor Tarifario
            } else {
              myRow.envio_domicilio = 0;
              myRow.valor_entrega_domicilio = 0;
            }

            saitRequest.push(myRow);
            createRequest.qty = createRequest.qty + 1;

        }else {


                    if(accountClient.tariffType == 'BY_PIECE'){

                        // Destino
                        await this.enabledPlaceRepository.find({
                          where: {
                            place_name: row.enabledPlace,
                          },
                        }).then(async placeArray => {
                          const zona = await this.zonesRepository.findOne({
                            cp: addressCpa
                          });

                          if (placeArray.length == 0) {
                            console.log("No existe enabled_place: ", addressCpa);
                          }

                          myRow.idog_lugar_destino = parseInt(placeArray[0].idog); // se saca de BD Enabled Places
                          myRow.desc_lugar_destino = row.enabledPlace; // enabled places

                          //Tarifa
                          await this.tariffRepository.find({
                            where: {
                              account: account,
                              weightFrom: LessThanOrEqual(row.totalWeight / row.qtyPieces),
                              weightTo: MoreThanOrEqual(row.totalWeight / row.qtyPieces)
                            },
                          }).then(tariffArray => {

                            const tariff = tariffArray[0];

                            myRow.valor_declarado = 0; // va cero
                            myRow.id_seguro = generalSettings.idSeguro; //config BD
                            myRow.seguro = tariff.insurance * row.qtyPieces; //Tarifario
                            myRow.letra_comprobante = generalSettings.letraComprobante; //config BD
                            myRow.boca_comprobante = generalSettings.bocaComprobante; //config BD

                            const tarifa = tariff[zona.zone];
                            // Tarifas
                            myRow.valor_flete = tarifa * row.qtyPieces;
                            myRow.valor_com_c_imp = tarifa * row.qtyPieces;
                            myRow.valor_com_s_imp = this.round((tarifa * row.qtyPieces) / 1.21);

                            // Tarifa
                            myRow.retiro_a_domicilio = 0;
                            myRow.idretiro_a_domicilio = generalSettings.idRetiroADomicilio; //config BD
                            myRow.valor_retiro_domicilio = tariff.homeWithdrawal * row.qtyPieces;

                            // Tarifa
                            if (row.homeDelivery) {
                              myRow.envio_domicilio = 1;
                              myRow.valor_entrega_domicilio = tariff.homeDelivery * row.qtyPieces; // valor Tarifario
                            } else {
                              myRow.envio_domicilio = 0;
                              myRow.valor_entrega_domicilio = 0;
                            }

                            saitRequest.push(myRow);
                            createRequest.qty = createRequest.qty + 1;
                          });
                        });
                  }
                  else if(accountClient.tariffType == 'BY_SHIPMENT'){

                    // Destino
                    await this.enabledPlaceRepository.find({
                      where: {
                        place_name: row.enabledPlace,
                      },
                    }).then(async placeArray => {
                      const zona = await this.zonesRepository.findOne({
                        cp: addressCpa
                      });

                      if (placeArray.length == 0) {     
                        console.log("No existe enabled_place: ", addressCpa);
                      }

                      myRow.idog_lugar_destino = parseInt(placeArray[0].idog); // se saca de BD Enabled Places
                      myRow.desc_lugar_destino = row.enabledPlace; // enabled places

                      //Tarifa
                      await this.tariffRepository.find({
                        where: {
                          account: account,
                          weightFrom: LessThanOrEqual(row.totalWeight),
                          weightTo: MoreThanOrEqual(row.totalWeight)
                        },
                      }).then(tariffArray => {

                        const tariff = tariffArray[0];

                        myRow.valor_declarado = 0; // va cero
                        myRow.id_seguro = generalSettings.idSeguro; //config BD
                        myRow.seguro = tariff.insurance; //Tarifario
                        myRow.letra_comprobante = generalSettings.letraComprobante; //config BD
                        myRow.boca_comprobante = generalSettings.bocaComprobante; //config BD

                        const tarifa = tariff[zona.zone];
                        // Tarifas
                        myRow.valor_flete = tarifa ;
                        myRow.valor_com_c_imp = tarifa ;
                        myRow.valor_com_s_imp = this.round((tarifa) / 1.21);

                        // Tarifa
                        myRow.retiro_a_domicilio = 0;
                        myRow.idretiro_a_domicilio = generalSettings.idRetiroADomicilio; //config BD
                        myRow.valor_retiro_domicilio = tariff.homeWithdrawal;

                        // Tarifa
                        if (row.homeDelivery) {
                          myRow.envio_domicilio = 1;
                          myRow.valor_entrega_domicilio = tariff.homeDelivery; // valor Tarifario
                        } else {
                          myRow.envio_domicilio = 0;
                          myRow.valor_entrega_domicilio = 0;
                        }

                        saitRequest.push(myRow);
                        createRequest.qty = createRequest.qty + 1;
                      });
                    });

                 }
                 else{
                  throw new Error("The tariffType for the client does not exists");
                 }
                                   
            }

              }));

      const workbook = utils.book_new();
      const worksheet = utils.json_to_sheet(saitRequest);
      utils.book_append_sheet(workbook, worksheet);

      let myTimeStamp = Date.now();
      let myFilepath = join(__dirname, `../service-request/tmp/saitfile-${myTimeStamp}.xlsx`);
      writeFile(workbook, myFilepath);

      if (errorRequest.qty > 0 || warningRequest.qty > 0) {
        const myRow = { createRequest, errorRequest, warningRequest };

        return { "created": false, "data": myRow };
      }

      // inicio proceso SAIT
      console.log("SAIT begin");
      await this.createSaitRequest(myFilepath, helper);
      console.log("SAIT finish");

      const myRow = { createRequest, errorRequest, warningRequest };

      return { "created": true, "data": myRow };

    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  private validatedFsrHasErrors(validatedFsr: any[]): boolean {
    let hasErrors = false;
    for (let i = 0; i < validatedFsr.length; i++) {
       if (!hasErrors) {
        hasErrors = hasErrors || this.checkFsrRowHasErrors(validatedFsr[i]);
       } else {
        return hasErrors;
       }
    }

    return hasErrors;
  }

  private checkFsrRowHasErrors(fsrRow: any): boolean {
    const fieldNames = Object.keys(fsrRow);
    return fieldNames.some(fn => fsrRow[fn].status === "danger");
  }

  private async createSaitRequest(myFilepath: string, helper) {
    console.log("IMPRIMOOOOO VALOOOREEESSS:");
    const { token } = await this.serviceSaitService.saitAccessToken();
    console.log("SAIT token: ", token);
    const upload: SaitResponseUploadInterface = await this.serviceSaitService.saitFileUpload(myFilepath, token);
    console.log("SAIT Upload (idarchivo): " + upload.idarchivo);
    console.log("SAIT Upload (link): " + upload.link);

    if (upload.estado === 1) {
      console.log("SAIT Upload OK!");
      // guardar idarchivo y link 
      let myids = helper.map(a => a.id);
      console.log("Proced to save the data");
      await this.saveAllData(myids, { "idfile": upload.idarchivo, "link": upload.link });
      console.log("All Data was saved");
      let validate: SaitResponseValidateInterface = await this.serviceSaitService.saitValidate(upload.idarchivo, token);
      if (validate.valido) {
        console.log("SAIT Validate OK!");
        let resultado: SaitResponseValidationResultInterface = await this.serviceSaitService.saitValidationResult(upload.idarchivo, token);
        if (!resultado.errorvalidacion) {
          console.log("SAIT validation errors OK!");
          let procesar: SaitResponseInterface = await this.serviceSaitService.saitProcess(upload.idarchivo, token);
          console.log("SAIT int process OK!");
          if (procesar.estado === 1) {
            let resultadoProceso: SaitResponseValidationResultInterface = await this.serviceSaitService.saitProcessResult(upload.idarchivo, token);
            if (!resultadoProceso.errorvalidacion) {

              const saitResult: any[] = resultadoProceso.resultado;

              await Promise.all(saitResult.map(async (result) => {
                // result.codigoexterno

                let myServiceRequest = helper.find(o => o.requestId === result.codigoexterno);

                console.log("comprobante: " + result.comprobante); // por solicitud
                console.log("delivery: " + JSON.stringify(result.deliveries));

                let deliveries: string = "";
                result.deliveries.forEach(async (row: any) => {
                  deliveries = deliveries + row.delivery + ";";
                });

                deliveries = deliveries.substr(0, deliveries.length - 1);

                // llama Sait Delivery por comprobante para chequear status
                let delivery: SaitResponseStatusDeliveryInterface = await this.serviceSaitService.saitDeliveryStatus(result.comprobante, token);
                console.log("status: " + JSON.stringify(delivery.estadodelivery));

                let estadoDelivery: any = delivery.estadodelivery;

                await this.saveData(myServiceRequest.id, { "voucher": result.comprobante, "delivery": deliveries, "status": estadoDelivery.estado, "statusDatetime": estadoDelivery.fechaestado });

              }));
            } else {
              console.log("SAIT process result error");
            }
          } else {
            console.log("SAIT init process error");
          }
        } else {
          console.log("SAIT validation errors: " + resultado.resultado);
          // devolver errores de validacion
        }
      } else {
        console.log("SAIT validate error");
        // console.log("Inicio validacion de errores");
        // let validation_result: SaitResponseValidateInterface = await this.serviceSaitService.saitValidationResult(upload.idarchivo, token);
        // console.log(validation_result);
        // console.log("Fin validacion de errores");
      }
    } else {
      console.log("SAIT upload error");
    }
    // console.log(await this.serviceSaitService.saitStatus("T01HTXczMU8rOGJhRGFnV3lTTXU5am5oSE0zS1NzVTM=","7548E7FDADFEE62B08C5B3C0E4B7F1C54EF23F"));  
  }

  private async saveAllData(ids, newValue) {
    const services = await this.serviceRequestRepository.findByIds(ids);
    return await Promise.all(services.map(async service => {
      const updatedAService = this.serviceRequestRepository.merge(service, newValue);
      await this.serviceRequestRepository.save(updatedAService);
    }));
  }

  private async saveData(id, newValue) {
    const serviceFound = await this.serviceRequestRepository.findOne({ id });
    if (!serviceFound) throw new Error(messages.noAccount);
    const updatedAService = this.serviceRequestRepository.merge(serviceFound, newValue);
    return await this.serviceRequestRepository.save(updatedAService);
  }

  private round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  public async createFormatServiceRequest(fsrDto: CreateFormatServiceRequestDto) {
    const accountId = fsrDto.accountId
    const fsr = await this.formatSrRepository.findOne({
      where: { accountId: accountId }
    })

    if (fsr) {
      throw new Error("Ya existe un formato de solicitud de servicio para cliente con id " + accountId);
    }

    let requestFields = fsrDto.requestFields;

    const positionsFromDto = this.getPositionsFromDto(requestFields);
    FormatSrPositionsValidator.validate(positionsFromDto);

    requestFields = this.transformNumericRequestFields(requestFields);

    const formatSr = await this.formatSrRepository.save({
      format: fsrDto.format,
      separator: fsrDto.separator,
      accountId: accountId,
      quoteChar: fsrDto.quoteChar
    })
    
    await this.saveFsrFields(formatSr, requestFields)
  }

  private transformNumericRequestFields(requestFields: RequestFieldsDto): RequestFieldsDto {
    const numericRequestsFieldsDto = this.getNumericRequestFieldsDto(requestFields);
    const transformedNumericRequestsFieldsDto = NumberFieldTransformer.transform(numericRequestsFieldsDto);

    numberFields.forEach(nf => delete requestFields[nf])
    transformedNumericRequestsFieldsDto.forEach(o => {
      requestFields = Object.assign({}, requestFields, o);
    })

    return requestFields;
  }

  private getNumericRequestFieldsDto(requestFields: RequestFieldsDto) {
    const numericRequestFieldsDto = []
    numberFields.forEach(nf => {
      numericRequestFieldsDto.push({[nf]: requestFields[nf]})
    });

    return numericRequestFieldsDto;
  }

  private getPositionsFromDto(requestFields: RequestFieldsDto): number[] {
    const res = []
    const keys = Object.keys(requestFields);

    // fn fieldname
    keys.map(fn => {
      let position = requestFields[fn].position
      if (position != null) res.push(position)
    })

    return res;
  }

  private async saveFsrFields(formatSr: FormatServiceRequestEntity, requestFields: RequestFieldsDto) {
    const keys = Object.keys(requestFields)
    keys.forEach((k) => {
      const algo = this.saveFsrFieldsAux(formatSr, k, requestFields[k])
    });
  }

  private async saveFsrFieldsAux(formatSr: FormatServiceRequestEntity, fieldName: string, field: any) {
    if (stringFields.includes(fieldName)) {
      this.fieldStringRepository.save({
        fieldName: fieldName,
        position: field.position,
        defaultValue: field.defaultValue,
        length: field.length,
        required: field.required,
        formatSr: formatSr
      })
    }
    else if (numberFields.includes(fieldName)) {
      this.fieldNumberRepositoty.save({
        fieldName: fieldName,
        position: field.position,
        defaultValue: field.defaultValue,
        required: field.required,
        formatSr: formatSr
      })
    }
    else {
      this.fieldBooleanRepository.save({
        fieldName: fieldName,
        position: field.position,
        defaultValue: field.defaultValue,
        required: field.required,
        formatSr: formatSr
      })
    }
  }

  public async getFormatLocalitiesXls() {
    return join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx");
  }

  public async uploadFormatLocalitiesXls(accountId: number, file: any) {
    const account = await this.getAccount(accountId);
    
    const sourceStream = createReadStream(file.path);
    const destinationStream = createWriteStream(join(__dirname, "../../../", TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`));

    sourceStream.pipe(destinationStream);
    
    this.accountLocalityRepository.delete({
      accountId: accountId
    });

    const localitiesToFormat = this.getFormatLocalities(file);
   
    
    this.saveFormatLocalities(localitiesToFormat, accountId);
  }

  private getFormatLocalities(file: any) {
    let formatLocalities: any[] = new LocalityFormatFileReader().readFile(file);
    
    // valido que la info que paso el cliente sea correcta y transformo los json al obj

    let errors = [];

    for (let i = 0; i < formatLocalities.length; i++) {
      // ltf = localityToFormat
      let ltf = formatLocalities[i];
      // si el cliente no proporcionó datos para la localidad, se saltea la validacion, etc
      if (!(ltf.cp === undefined && ltf.locality === undefined && ltf.province === undefined)) {
        const isValidLTF = LocalityToFormatValidator.validate(ltf);
        if (isValidLTF.length !== 0) {
          errors = errors.concat(formatLocalityError(i + 3, isValidLTF))
        }
      }
    }

    this.getHttpErrorIf(errors.length > 0, HttpStatus.BAD_REQUEST, errors);

    formatLocalities = formatLocalities.filter(ltf => ltf.locality !== undefined ||
      ltf.cp !== undefined ||
      ltf.province !== undefined);

    if (formatLocalities.length === 0) {
      throw new Error("No se cargó ninguna localidad en la planilla")
    }

    let hasDuplicatesEntries: boolean = DuplicateLocalityEntriesChecker.hasDuplicates(formatLocalities);

    this.getHttpErrorIf(hasDuplicatesEntries, HttpStatus.BAD_REQUEST, 'Hay entradas repetidas en la planilla');
   
    return formatLocalities;
  }

  private getHttpErrorIf(condition: boolean, httpStatus: any, error: any) {
    if (condition) {
      throw new HttpException({
        status: httpStatus,
        error: error,
      },
        httpStatus
      )
    }
  }

  private saveFormatLocalities(formatLocalities: any[], accountId: number) {
    formatLocalities.forEach(ltf => {
      this.saveFormatLocality(ltf, accountId)
    })
  }

  private async saveFormatLocality(formatLocality: any, accountId: number) {
    const enabledPlace = await this.getEnabledPlace(formatLocality.idog);

    this.accountLocalityRepository.save({
      province: formatLocality.province,
      cp: formatLocality.cp,
      locality: formatLocality.locality,
      enabledPlaceId: enabledPlace[0].id,
      accountId: accountId
    })
  }

  private async getEnabledPlace(idog: number) {
    return this.enabledPlaceRepository.find({
      where: { idog: String(idog) }
    })
  }

  private async getAccount(accountId: number) {
    return this.accountRepository.findOne({
      where: { id: accountId }
    })
  }

  public async getFormatServiceRequest(accountId: number) {

    const formatSr = await this.getFsr(accountId);

    if (!formatSr) {
      this.getHttpErrorIf(!formatSr, HttpStatus.NOT_FOUND, "No existe un formato de solicitud para el id de cuenta dado")
    }

    const formatSrId = formatSr.id;

    const stringFields = await this.getStringFields(formatSrId);
    const numberFields = await this.getNumberFields(formatSrId)
    const booleanFields = await this.getBooleanFields(formatSrId);

    return EntityFieldToFsrMapper.map(stringFields, numberFields, booleanFields, formatSr);
  }

  private async getFsr(accountId: number) {
    return this.formatSrRepository.findOne({ where: { accountId: accountId } });
  }

  public async updateFormatServiceRequest(updateFsrDto: any) {

    const accountId = updateFsrDto.accountId;
    const fsr: FormatServiceRequestEntity = await this.getFsr(accountId);

    if (!fsr) {
      throw new Error("No existe un formato de solicitud para el id de cuenta dado");
    }

    let requestFields = updateFsrDto.requestFields;
    FormatSrPositionsValidator.validate(this.getPositionsFromDto(requestFields));

    requestFields = this.transformNumericRequestFields(requestFields);

    const isValidFsr = requestFields !== undefined && Object.keys(requestFields).length > 0;
    if (!isValidFsr) {
      throw new Error("Invalid update fsr");
    }

    const format = updateFsrDto.format;
    const separator = updateFsrDto.separator;
    const quoteChar = updateFsrDto.quoteChar;

    if (format !== undefined || separator !== undefined || quoteChar !== undefined) {
      if (format !== undefined) {
        fsr.format = format;
      }
      if (separator !== undefined) {
        fsr.separator = separator;
      }
      if (quoteChar != undefined) {
        fsr.quoteChar = quoteChar
      }

      this.formatSrRepository.save(fsr);
    }

    if (requestFields !== undefined && Object.keys(requestFields).length !== 0) {
      this.updateFsrRequestFields(accountId, requestFields, fsr.id);
    }
  }

  private async updateFsrRequestFields(accoundId: number,
    requestFields: RequestFieldsDto,
    formatRequestServiceId: number) {

    const stringFieldRows = await this.getStringFields(formatRequestServiceId);
    const numberFieldRows = await this.getNumberFields(formatRequestServiceId);
    const booleanFieldRows = await this.getBooleanFields(formatRequestServiceId);

    const requestFieldsKeys = Object.keys(requestFields);

    requestFieldsKeys.map(rfk => {
      let requestField = requestFields[rfk]
      if (stringFields.includes(rfk)) {
        let stringFieldRow = stringFieldRows.filter(sfr => sfr.fieldName === rfk)[0];
        let updatedStringFieldRow = this.updateStringField(stringFieldRow, requestField);
        this.fieldStringRepository.save(updatedStringFieldRow);
      } else if (numberFields.includes(rfk)) {
        let numberFieldRow = numberFieldRows.filter(sfr => sfr.fieldName === rfk)[0];
        let updatedNumberFieldRow = this.updateCommonFields(numberFieldRow, requestField);
        this.fieldNumberRepositoty.save(updatedNumberFieldRow);
      } else {
        let booleanFieldRow = booleanFieldRows.filter(sfr => sfr.fieldName === rfk)[0];
        let updatedBooleanFieldRow = this.updateCommonFields(booleanFieldRow, requestField);
        this.fieldBooleanRepository.save(updatedBooleanFieldRow);
      }
    })
  }

  private updateStringField(stringFieldRow: FieldStringEntity, requestField: any) {
    stringFieldRow = this.updateCommonFields(stringFieldRow, requestField);
    if (requestField.length !== undefined) stringFieldRow.length = requestField.length;

    return stringFieldRow;
  }

  private updateCommonFields(fieldRow: any, requestField: any): any {
    if (requestField.position !== undefined) fieldRow.position = requestField.position;
    if (requestField.defaultValue !== undefined) fieldRow.defaultValue = requestField.defaultValue;
    if (requestField.required !== undefined) fieldRow.required = requestField.required;

    return fieldRow;
  }

  // dtv = data to validate
  private getDTVDefaultServiceRequest(): any {
    return {
      requestId: dtvDefaultSr(false),
      // recipient
      recipientFullname: dtvDefaultSr(false),
      docType: dtvDefaultSr(false),
      docNumber: dtvDefaultSr(false),
      phone: dtvDefaultSr(true),
      email: dtvDefaultSr(true),

      // address
      addressBuilding: dtvDefaultSr(true),
      addressFloor: dtvDefaultSr(true),
      addressApartment: dtvDefaultSr(true),

      // geo
      enabledPlace: dtvDefaultSr(false),
      locality: dtvDefaultSr(false),
      province: dtvDefaultSr(false),
      cpa: dtvDefaultSr(false),

      qtyPieces: {},
      totalWeight: {},
      homeDelivery: dtvDefaultSr(false),
      observations: dtvDefaultSr(true),
    }
  }

  public async getFormatLocalitiesXlsAccount(accountId?: number) {
    // acs = account localities
    const acs = await this.accountLocalityRepository.find({
      where: { accountId: accountId }
    })
    // eps = enabled places
    let eps = await this.enabledPlaceRepository
      .createQueryBuilder("ep")
      .innerJoinAndSelect(LocalityEntity, "l", "ep.place_name = l.enabled_place")
      .where("l.isActive = :isActive", { isActive: true })
      .andWhere("ep.isActive = :isActive", { isActive: true })
      .orderBy("ep.place_name")
      .getRawMany();

    let epsAux = [];
    eps.map(ep => {
      epsAux.push(
        {
          idog: ep.ep_idog,
          placeName: ep.ep_place_name,
          localitySys: ep.ep_locality_name,
          provinceSys: ep.ep_province_name,
          zipCodeSys: ep.l_zip_code
        }
      )
    })
    //escribir excel
    if (acs.length == 0) {          
      const workbook = readFile(join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));      
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const range = utils.decode_range(sheet['!ref']);
        // Borra el contenido del rango de celdas a patir de la fila 3 (donde comienzan los datos de la planilla)
      for (let indexRow = 2; indexRow < range.e.r; indexRow++  ) {
        //solo el las columnas de localidades de bugpack, hasta la columna E
        for(let indexColumn = 0; indexColumn < 5; indexColumn++)
          delete sheet[utils.encode_cell({ c: indexColumn, r: indexRow })];
      } 
      utils.sheet_add_json(sheet, epsAux, { origin: "A3", skipHeader: true })
      writeFile(workbook,join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
      return join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx");
    } else {
      const options = {
        root: join(__dirname, "/../../shared/template-files/"),
        file: `formato_localidades_custom_${accountId}.xlsx`
      };
      try {
        if (readdirSync(options.root).includes(options.file)) {
          const workbook = readFile(join(__dirname, "../../../", TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`));
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const range = utils.decode_range(sheet['!ref']);
            // Borra el contenido del rango de celdas a patir de la fila 3 (donde comienzan los datos de la planilla)
          for (let indexRow = 2; indexRow < range.e.r; indexRow++  ) {
            //solo el las columnas de localidades de bugpack y de usuario, hasta la columna J
            for(let indexColumn = 0; indexColumn < 8; indexColumn++)
              delete sheet[utils.encode_cell({ c: indexColumn, r: indexRow })];
          } 
          utils.sheet_add_json(sheet, epsAux, { origin: "A3", skipHeader: true })
          let epsAcsMap = []
          acs.map(epAccount => {
            if(eps.find(enabledPlace => enabledPlace.ep_id == epAccount.enabledPlaceId)  !== undefined ) {
              epsAcsMap.push({
                Localidad: epAccount.locality,
                Provincia: epAccount.province,
                CP: epAccount.cp
              });
            }     
          }); 
          utils.sheet_add_json(sheet, epsAcsMap, { origin: "F3", skipHeader: true })
          writeFile(workbook,join(__dirname, "../../../", TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`));
          return join(__dirname, "../../../", TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`)          
        } else {
          const workbook = readFile(join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));      
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const range = utils.decode_range(sheet['!ref']);
            // Borra el contenido del rango de celdas a patir de la fila 3 (donde comienzan los datos de la planilla)
          for (let indexRow = 2; indexRow < range.e.r; indexRow++  ) {
            //solo el las columnas de localidades de bugpack, hasta la columna E
            for(let indexColumn = 0; indexColumn < 5; indexColumn++)
              delete sheet[utils.encode_cell({ c: indexColumn, r: indexRow })];
          } 
          utils.sheet_add_json(sheet, epsAux, { origin: "A3", skipHeader: true })
          writeFile(workbook,join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
          return join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx");                    
        }
      } catch (error) {
        console.log(error);
        const workbook = readFile(join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));      
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const range = utils.decode_range(sheet['!ref']);
          // Borra el contenido del rango de celdas a patir de la fila 3 (donde comienzan los datos de la planilla)
        for (let indexRow = 2; indexRow < range.e.r; indexRow++  ) {
          //solo el las columnas de localidades de bugpack, hasta la columna E
          for(let indexColumn = 0; indexColumn < 5; indexColumn++)
            delete sheet[utils.encode_cell({ c: indexColumn, r: indexRow })];
        } 
        utils.sheet_add_json(sheet, epsAux, { origin: "A3", skipHeader: true })
        writeFile(workbook,join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
        return join(__dirname, "../../../", TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx");
      }    
    }
  }

  private getXlsLocalitiesWorkbook(data: any[]): any {
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet([]);

    // merge header cells
    worksheet["!merges"] = [];
    worksheet["!merges"].push(utils.decode_range("A1:E1"));
    worksheet["!merges"].push(utils.decode_range("F1:H1"));

    utils.sheet_add_aoa(worksheet, [["Lugares habilitados por el sistema"]], { origin: "A1" });
    utils.sheet_add_aoa(worksheet, [["Carga personalizada por el cliente"]], { origin: "F1" })
    utils.sheet_add_aoa(worksheet, [["Idog", "Lugar", "Localidad", "Provincia", "CP", "Localidad", "Provincia", "CP"]], { origin: "A2" })
    utils.sheet_add_json(worksheet, data, { origin: "A3", skipHeader: true })
    utils.book_append_sheet(workbook, worksheet, "Hoja 1")

    return workbook
  }

  public async updateFormatLocalitiesXlsAccount(accountId: number, file: any) {
    // acs = account localities
    const acs = await this.accountLocalityRepository.find({
      where: { accountId: accountId }
    });

    if (acs.length === 0) {
      throw new Error("No se cargó el formato de localidades para el id de la cuenta dado");
    }

    const sourceStream = createReadStream(file.path);
    const destinationStream = createWriteStream(join(__dirname, "../../../", TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`));

    sourceStream.pipe(destinationStream);

    const formatLocalitiesToUpdate = this.getFormatLocalities(file);

    this.accountLocalityRepository.remove(acs);
    this.saveFormatLocalities(formatLocalitiesToUpdate, accountId)

    return 'foo';
  }

  public async getLocalitiesByAccountId(accountId: number)  {
    const acs = await this.accountLocalityRepository.find({
      where: { accountId: accountId }
    });
    var result =  acs.length === 0 ? '{ "exists": false}' : '{ "exists": true}'
    return JSON.parse(result);
  }
}
