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
exports.ServiceRequestService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const strings_constants_1 = require("../../shared/config/strings-constants");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const xlsx_1 = require("xlsx");
const service_request_entity_1 = require("./entities/service-request.entity");
const account_entity_1 = require("../account/entities/account.entity");
const dtos_1 = require("./dtos");
const services_sait_service_1 = require("../services-sait/services-sait.service");
const sait_request_dto_1 = require("../services-sait/dto/sait-request.dto");
const general_settings_entity_1 = require("../general-settings/entities/general-settings.entity");
const tariff_entity_1 = require("../user/entities/tariff.entity");
const zonescp_entity_1 = require("../enabled-places/entities/zonescp.entity");
const location_entity_1 = require("../enabled-places/entities/location.entity");
const enabled_places_entity_1 = require("../enabled-places/entities/enabled-places.entity");
const moment = require("moment");
const label_service_request_dto_1 = require("./dtos/label-service-request.dto");
const format_sr_entity_1 = require("./entities/format-sr.entity");
const field_number_sr_entity_1 = require("./entities/field-number-sr.entity");
const field_boolean_sr_entity_1 = require("./entities/field-boolean-sr.entity");
const field_string_sr_entity_1 = require("./entities/field-string-sr.entity");
const datatype_fields_1 = require("../../shared/datatype-fields");
const spreadsheet_reader_strategy_1 = require("./helpers/sr-file-reader.ts/spreadsheet-reader-strategy");
const csv_reader_strategy_1 = require("./helpers/sr-file-reader.ts/csv-reader-strategy");
const constants_1 = require("../../shared/constants");
const account_locality_entity_1 = require("./entities/account-locality.entity");
const locality_format_file_reader_1 = require("./helpers/locality-format-file-reader");
const locality_to_format_validator_1 = require("./helpers/validators/locality-to-format-validator");
const format_locality_error_1 = require("./helpers/format-locality-error");
const format_enabled_place_finder_1 = require("./helpers/enabled-place-finder/format-enabled-place-finder");
const duplicate_locality_entries_checker_1 = require("./helpers/duplicate-locality-entries-checker");
const entity_field_to_fsr_mapper_1 = require("./helpers/entity-field-to-fsr-mapper");
const default_service_request_validator_1 = require("./helpers/validators/default-service-request-validator");
const format_service_request_validator_1 = require("./helpers/validators/format-service-request-validator");
const data_to_validate_default_sr_1 = require("./helpers/data-to-validate-default-sr");
const default_enabled_place_finder_1 = require("./helpers/enabled-place-finder/default-enabled-place-finder");
const format_sr_positions_validator_1 = require("./helpers/validators/format-sr-positions-validator");
const update_fsr_validator_1 = require("./helpers/validators/update-fsr-validator");
const numeric_field_transformer_1 = require("./helpers/numeric-field-transformer");
const planilla_excel_entity_1 = require("./entities/planilla_excel.entity");
let ServiceRequestService = class ServiceRequestService {
    constructor(serviceRequestRepository, generalSettingsRepository, tariffRepository, zonesRepository, accountRepository, localityRepository, enabledPlaceRepository, formatSrRepository, fieldNumberRepositoty, fieldStringRepository, fieldBooleanRepository, accountLocalityRepository, planillaExcelRepository, serviceSaitService, formatEnabledPlaceFinder, defaultEnabledPlacesFinder, defaultSrValidator, fsrValidator, updateFsrValidator) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.generalSettingsRepository = generalSettingsRepository;
        this.tariffRepository = tariffRepository;
        this.zonesRepository = zonesRepository;
        this.accountRepository = accountRepository;
        this.localityRepository = localityRepository;
        this.enabledPlaceRepository = enabledPlaceRepository;
        this.formatSrRepository = formatSrRepository;
        this.fieldNumberRepositoty = fieldNumberRepositoty;
        this.fieldStringRepository = fieldStringRepository;
        this.fieldBooleanRepository = fieldBooleanRepository;
        this.accountLocalityRepository = accountLocalityRepository;
        this.planillaExcelRepository = planillaExcelRepository;
        this.serviceSaitService = serviceSaitService;
        this.formatEnabledPlaceFinder = formatEnabledPlaceFinder;
        this.defaultEnabledPlacesFinder = defaultEnabledPlacesFinder;
        this.defaultSrValidator = defaultSrValidator;
        this.fsrValidator = fsrValidator;
        this.updateFsrValidator = updateFsrValidator;
    }
    async downloadFile() {
        let results = await this.planillaExcelRepository.findOne();
        if (results.excel.length > 0) {
            const base64Data = results.excel;
            const binaryData = Buffer.from(base64Data, 'base64');
            return binaryData;
        }
    }
    async getAll() {
        return await this.serviceRequestRepository.find();
    }
    async updateRequests() {
        const { token } = await this.serviceSaitService.saitAccessToken();
        let requests = await this.serviceRequestRepository.find({
            where: {
                delivery: typeorm_1.Not(typeorm_1.IsNull()),
                status: typeorm_1.Not("Entregado"),
            }
        });
        for (let i = 0; i < requests.length; i++) {
            let request = requests[i];
            let delivery = await this.serviceSaitService.saitDeliveryStatus(request.voucher, token);
            if (delivery.mensaje === "Correcto") {
                if (request.status != delivery.estadodelivery['estado']) {
                    request.status = delivery.estadodelivery['estado'];
                    await this.serviceRequestRepository.save(request);
                }
            }
        }
    }
    async updateRequestsBetweenDates(fromDate, toDate, account) {
        console.log("entro a actualizar");
        const { token } = await this.serviceSaitService.saitAccessToken();
        const dateStringFrom = fromDate;
        const dateObjectFrom = new Date(dateStringFrom);
        dateObjectFrom.setHours(0, 0, 0, 0);
        let dateStringToDate = toDate;
        const dateObjectToDate = new Date(dateStringToDate);
        dateObjectToDate.setHours(23, 0, 0, 0);
        console.log(dateObjectFrom, dateObjectToDate);
        let requests = await this.serviceRequestRepository.find({
            where: {
                delivery: typeorm_1.Not(typeorm_1.IsNull()),
                status: typeorm_1.Not("Entregado"),
                createdAt: typeorm_1.Between(dateObjectFrom, dateObjectToDate),
                account: account
            }
        });
        console.log("ya tengo todo de la BD");
        console.log(requests.length);
        for (let i = 0; i < requests.length; i++) {
            console.log(1);
            let request = requests[i];
            console.log(request.voucher);
            let delivery = await this.serviceSaitService.saitDeliveryStatus(request.voucher, token);
            console.log("consulte uno a sait");
            if (delivery.mensaje === "Correcto") {
                console.log(request.status);
                console.log(delivery.estadodelivery['estado']);
                if (request.status != delivery.estadodelivery['estado']) {
                    request.status = delivery.estadodelivery['estado'];
                    await this.serviceRequestRepository.save(request);
                }
            }
            console.log("Siguiente");
        }
    }
    async getByRequestIdVoucherAndDelivery(requestId, voucher, delivery, account, dateFrom, dateTo) {
        try {
            if (dateFrom != "" && dateTo != "") {
                const dateStringFrom = dateFrom;
                const dateObjectFrom = new Date(dateStringFrom);
                dateObjectFrom.setHours(0, 0, 0, 0);
                let dateStringToDate = dateTo;
                const dateObjectToDate = new Date(dateStringToDate);
                dateObjectToDate.setHours(23, 0, 0, 0);
                let myQuery = {
                    where: {
                        account: account,
                        requestId: requestId,
                        voucher: voucher,
                        createdAt: typeorm_1.Between(dateObjectFrom, dateObjectToDate),
                        delivery: typeorm_1.Like(`%${delivery}%`),
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
                const fullAddress = `${account.addressStreet} ${account.addressNumber}, ${account.locality}`;
                const filteredArray = serviceRequestArray.filter(element => element.voucher !== null);
                const LabelResponse = [];
                filteredArray.forEach(element => {
                    const myElement = element;
                    const delivery = element.delivery;
                    const deliveryArray = delivery.split(";");
                    deliveryArray.forEach(piece => {
                        let labelReturn = new label_service_request_dto_1.LabelServiceRequestDto();
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
            else {
                let myQuery = {
                    where: {
                        account: account,
                        requestId: requestId,
                        voucher: voucher,
                        delivery: typeorm_1.Like(`%${delivery}%`),
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
                const LabelResponse = [];
                filteredArray.forEach(element => {
                    const myElement = element;
                    const delivery = element.delivery;
                    const deliveryArray = delivery.split(";");
                    deliveryArray.forEach(piece => {
                        let labelReturn = new label_service_request_dto_1.LabelServiceRequestDto();
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
                        LabelResponse.push(labelReturn);
                    });
                });
                return LabelResponse;
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getByQuery(requestId, voucher, delivery, fromDate, toDate, account) {
        try {
            let myQuery = { where: { account: account } };
            const formattedFromDate = new Date(fromDate);
            const formattedToDate = new Date(toDate);
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
                myQuery.where.delivery = typeorm_1.Like(`%${delivery}%`);
            }
            if (formattedFromDate.toString() !== 'Invalid Date' && formattedToDate.toString() !== 'Invalid Date') {
                myQuery.where.createdAt = typeorm_1.Raw((alias) => `${alias} >= :fromDate and ${alias} <= :toDate`, {
                    fromDate: formattedFromDate.toISOString(),
                    toDate: formattedToDate.toISOString()
                });
            }
            else {
                if (formattedFromDate.toString() !== 'Invalid Date') {
                    myQuery.where.createdAt = typeorm_1.Raw((alias) => `${alias} >= :fromDate`, {
                        fromDate: formattedFromDate.toISOString()
                    });
                }
                if (formattedToDate.toString() !== 'Invalid Date') {
                    myQuery.where.createdAt = typeorm_1.Raw((alias) => `${alias} <= :toDate`, {
                        toDate: formattedToDate.toISOString()
                    });
                }
            }
            const serviceRequestArray = await this.serviceRequestRepository
                .find(myQuery);
            const QueryResponse = [];
            serviceRequestArray.forEach(element => {
                let queryReturn = new dtos_1.QueryServiceRequestDto();
                let addressNumber = element.addressNumber;
                if (addressNumber == null)
                    addressNumber = '';
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
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async uploadFile(file, account, isStandardFormat) {
        const accountId = account.id;
        const formatSr = await this.formatSrRepository.findOne({
            where: { accountId: accountId }
        });
        let readFileOptions = {};
        let rawData = null;
        let res = null;
        try {
            if (!isStandardFormat) {
                if (!formatSr)
                    throw new Error("El administrador no ha creado un formato personalidado para cargar aún");
                const formatSrId = formatSr.id;
                const stringFields = await this.getStringFields(formatSrId);
                const numberFields = await this.getNumberFields(formatSrId);
                const booleanFields = await this.getBooleanFields(formatSrId);
                const fieldnamesPositions = this.getFieldnamesPositions(stringFields, numberFields, booleanFields);
                const dtv = { stringFields, numberFields, booleanFields };
                const format = formatSr.format;
                const quoteChar = formatSr.quoteChar;
                readFileOptions["isThereAFsr"] = true;
                if (format === "xls") {
                    this.srFileReader = new spreadsheet_reader_strategy_1.default();
                    readFileOptions["separator"] = null;
                }
                else {
                    this.srFileReader = new csv_reader_strategy_1.default();
                    const separator = formatSr.separator;
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
                    if (!this.epFieldsHaveErrors(row.locality, row.province, row.cpa)) {
                        let resWithEnabledPlace = await this.formatEnabledPlaceFinder.find(row.enabledPlace, row.locality, row.province, row.cpa, accountLocalities, epDtv);
                        res[i].enabledPlace = resWithEnabledPlace.enabledPlace;
                        res[i].province = resWithEnabledPlace.province;
                        res[i].cpa = resWithEnabledPlace.cpa;
                        res[i].locality = resWithEnabledPlace.locality;
                    }
                }
            }
            else {
                this.srFileReader = new spreadsheet_reader_strategy_1.default();
                readFileOptions = { isThereAFsr: false };
                rawData = await this.srFileReader.readFile(file, readFileOptions);
                res = await this.defaultSrValidator.validate(rawData, account, null, null);
            }
            for (let i = 0; i < res.length; i++) {
                let row = res[i];
                row = await this.validateEPIsCurrentlyEnabled(row);
            }
            for (let i = 0; i < res.length; i++) {
                let row = res[i];
                row = await this.validateTotalWeightAndQtyPiecesOnTariff(row, account);
            }
            res = this.roundNumericFields(res);
            return res;
        }
        catch (e) {
            console.log(e.message);
            throw new Error("Hubo un error al procesar el archivo.\n Asegúrese de que su archivo se corresponda con el metodo elegido, que los datos de las columnas coincidan con los valores de la misma y que no haya errores de formato.");
        }
    }
    async validateTotalWeightAndQtyPiecesOnTariff(row, account) {
        const totalWeight = row.totalWeight;
        const qtyPieces = row.qtyPieces;
        if (totalWeight.status === "ok" && qtyPieces.status === "ok") {
            await this.tariffRepository.find({
                where: {
                    account: account,
                    weightFrom: typeorm_1.LessThanOrEqual(totalWeight.value / qtyPieces.value),
                    weightTo: typeorm_1.MoreThanOrEqual(totalWeight.value / qtyPieces.value)
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
        row.qtyPieces = qtyPieces;
        return row;
    }
    getEpDtv(stringFields) {
        return stringFields.filter(sf => sf.fieldName === "province" || sf.fieldName === "locality" || sf.fieldName === "cpa");
    }
    epFieldsHaveErrors(locality, province, cpa) {
        return locality.status === "danger" || province.status === "danger" || cpa.status === "danger";
    }
    roundNumericFields(srFileResult) {
        srFileResult.forEach(sr => {
            let totalWeight = sr.totalWeight;
            if (totalWeight.status === "ok") {
                totalWeight.value = Math.round(totalWeight.value);
                sr.totalWeight = totalWeight;
            }
        });
        return srFileResult;
    }
    async validateEPIsCurrentlyEnabled(row) {
        let enabledPlace = row.enabledPlace;
        let locality = row.locality;
        let province = row.province;
        let cpa = row.cpa;
        if (row.homeDelivery.value === "NO") {
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
                    }
                    else {
                        if (place[0].zip_code != cpa.value) {
                            cpa.status = "danger";
                            cpa.error = "El codigo Postal no pertence a un lugar habilitado";
                            this.error = true;
                        }
                    }
                });
            }
        }
        else {
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
    async getStringFields(formatSrId) {
        return this.fieldStringRepository
            .createQueryBuilder("sf")
            .innerJoinAndSelect(format_sr_entity_1.default, "fsr", "sf.format_sr_id = fsr.id")
            .where("sf.format_sr_id = :formatSrId", { formatSrId: formatSrId })
            .getMany();
    }
    async getNumberFields(formatSrId) {
        return this.fieldNumberRepositoty
            .createQueryBuilder("nf")
            .innerJoinAndSelect(format_sr_entity_1.default, "fsr", "nf.format_sr_id = fsr.id")
            .where("nf.format_sr_id = :formatSrId", { formatSrId: formatSrId })
            .getMany();
    }
    async getBooleanFields(formatSrId) {
        return this.fieldBooleanRepository
            .createQueryBuilder("bf")
            .innerJoinAndSelect(format_sr_entity_1.default, "fsr", "bf.format_sr_id = fsr.id")
            .where("bf.format_sr_id = :formatSrId", { formatSrId: formatSrId })
            .getMany();
    }
    getFieldnamesPositions(fieldStringRows, fieldNumberRows, fieldBooleanRows) {
        const fpsr = fieldStringRows.map(r => ({ fieldname: r.fieldName, position: r.position }));
        const fpnr = fieldNumberRows.map(r => ({ fieldname: r.fieldName, position: r.position }));
        const fpbr = fieldBooleanRows.map(r => ({ fieldname: r.fieldName, position: r.position }));
        return fpsr.concat(fpnr).concat(fpbr).filter(r => r.position !== null);
    }
    getAreValidFieldsToGetEP(localityErrorStatus, provinceErrorStatus, cpaErrorStatus) {
        var res = false;
        var errorStatusDangerCount = 0;
        if (localityErrorStatus === "danger")
            errorStatusDangerCount++;
        if (provinceErrorStatus === "danger")
            errorStatusDangerCount++;
        if (cpaErrorStatus === "danger")
            errorStatusDangerCount++;
        if (errorStatusDangerCount < 2)
            res = true;
        return res;
    }
    validateAttributte(value, type, empty = false) {
        let error = "";
        let status = "ok";
        const attr = { value: value, status: status, error: error };
        if (value == undefined || value === "") {
            value = "";
            if (!empty) {
                attr.error = "Este atributo no puede ser vacio";
                attr.status = "danger";
                attr.value = value;
                this.error = true;
                return attr;
            }
        }
        const mapTypes = {
            string: 'texto',
            number: 'número'
        };
        if (typeof value !== type && type !== "string" && !empty) {
            attr.status = "danger";
            attr.error = `Este atributo debe ser ${mapTypes[type]}`;
            this.error = true;
        }
        return attr;
    }
    async createRequest(body, account, isStandardFormat) {
        try {
            this.error = false;
            let createRequest = { qty: 0, detail: "" };
            let errorRequest = { qty: 0, detail: "" };
            let warningRequest = { qty: 0, detail: "" };
            let response = null;
            if (isStandardFormat === "true") {
                response = await this.defaultSrValidator.validate(body, account, null, null);
            }
            else {
                const accountId = account.id;
                const formatSr = await this.formatSrRepository.findOne({
                    where: { accountId: accountId }
                });
                const formatSrId = formatSr.id;
                let stringFields = await this.getStringFields(formatSrId);
                let numberFields = await this.getNumberFields(formatSrId);
                let booleanFields = await this.getBooleanFields(formatSrId);
                const dtv = { stringFields, numberFields, booleanFields };
                response = await this.fsrValidator.validate(body, account, dtv, false);
            }
            for (let i = 0; i < response.length; i++) {
                let row = response[i];
                row = await this.validateEPIsCurrentlyEnabled(row);
            }
            for (let i = 0; i < response.length; i++) {
                let row = response[i];
                row = await this.validateTotalWeightAndQtyPiecesOnTariff(row, account);
            }
            this.error = this.validatedFsrHasErrors(response);
            if (this.error) {
                return { "created": false, "data": response };
            }
            const serviceRequest = [];
            body.forEach(async (row) => {
                let myRow = row;
                if (row.homeDelivery === "SI") {
                    myRow.homeDelivery = true;
                }
                else if (row.homeDelivery === "NO") {
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
            let helper;
            await this.serviceRequestRepository.save(serviceRequest)
                .then((result) => {
                helper = result.map(row => {
                    return { "id": row.id, "requestId": `${row.requestId}` };
                });
            });
            const saitRequest = [];
            await Promise.all(body.map(async (row, index) => {
                let myRow = new sait_request_dto_1.SaitRequestDto();
                myRow.posicion = 0;
                myRow.codigoexterno = row.requestId;
                myRow.desc_lugar_origen = generalSettings.descLugarOrigen;
                myRow.idog_lugar_origen = generalSettings.idLugarOrigen;
                let addressCpa = row.cpa;
                myRow.remitente = accountClient.companyName;
                myRow.rem_tipodoc = "";
                myRow.rem_nrodoc = 0;
                myRow.rem_tel = "";
                myRow.rem_email = "";
                myRow.destinatario = row.recipientFullname;
                myRow.des_tipodoc = row.docType;
                myRow.des_nrodoc = row.docNumber;
                myRow.des_tel = row.phone;
                myRow.des_email = row.email;
                myRow.lr_zona = "";
                myRow.lr_manzana = "";
                myRow.lr_calle = accountClient.addressStreet;
                myRow.lr_nro = accountClient.addressNumber;
                myRow.lr_edificio = accountClient.addressBuilding;
                myRow.lr_piso = accountClient.addressFloor;
                myRow.lr_dpto = accountClient.addressApartment;
                myRow.lr_cp = "";
                myRow.lr_localidad = accountClient.locality;
                myRow.lr_provincia = accountClient.province;
                myRow.lr_pais = accountClient.country;
                myRow.id_entrega_domicilio = generalSettings.idEntregaDomicilio;
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
                myRow.idagentecc = accountClient.idClientAgent;
                myRow.identidadcc = accountClient.idClientEntity;
                myRow.codigocc = accountClient.codeECO;
                myRow.descripcioncc = "";
                myRow.cuitcc = accountClient.cuit;
                myRow.dimensiones = "";
                myRow.pesodb = "";
                myRow.prioridad = "";
                myRow.peso_total = row.totalWeight;
                myRow.id_agencia_origen = generalSettings.idAgenciaOrigen;
                myRow.desc_agencia_origen = generalSettings.descAgenciaOrigen;
                myRow.domicilio_agencia_origen = generalSettings.domicilioAgenciaOrigen;
                myRow.telefono_agencia_origen = generalSettings.telefonoAgenciaOrigen;
                myRow.cp_agencia_origen = generalSettings.cpAgenciaOrigen;
                myRow.cp_agencia_destino = "";
                myRow.id_otros_importes = generalSettings.otrosImportes;
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
                        errorRequest.detail = errorRequest.detail.concat(`- Fila ${index + 1}: ${account.companyName} no tiene un tarifario creado o vigente\n`);
                        return;
                    }
                    const placeArray = await this.enabledPlaceRepository.find({
                        where: {
                            place_name: row.enabledPlace,
                        },
                    });
                    if (placeArray.length === 0) {
                        errorRequest.qty = errorRequest.qty + 1;
                        errorRequest.detail = errorRequest.detail.concat(`- Fila ${index + 1}: El enabled place ${row.enabledPlace} no fue encontrado o no esta activo.\n`);
                        return;
                    }
                    const enabledPlace = placeArray[0];
                    myRow.idog_lugar_destino = parseInt(placeArray[0].idog);
                    myRow.desc_lugar_destino = row.enabledPlace;
                    const area = pricing.getAreaFromEnabledPlace(enabledPlace);
                    if (area === null) {
                        errorRequest.qty = errorRequest.qty + 1;
                        errorRequest.detail = errorRequest.detail.concat(`- Fila ${index + 1}: ${enabledPlace.place_name} con idog ${enabledPlace.idog} no fue encontrado en el tarifario personalizado de ${account.companyName}\n`);
                        return;
                    }
                    const desiredWeight = row.totalWeight / row.qtyPieces;
                    const pricingRow = area.getPriceRowFrom(desiredWeight);
                    if (pricingRow === null) {
                        errorRequest.qty = errorRequest.qty + 1;
                        errorRequest.detail = errorRequest.detail.concat(`- Fila ${index + 1}: No se ha encontrado un precio para el peso en el tarifario personalizado de ${account.companyName}\n`);
                        return;
                    }
                    myRow.valor_declarado = 0;
                    myRow.id_seguro = generalSettings.idSeguro;
                    myRow.seguro = pricingRow.insurance * row.qtyPieces;
                    myRow.letra_comprobante = generalSettings.letraComprobante;
                    myRow.boca_comprobante = generalSettings.bocaComprobante;
                    const tarifa = pricingRow.basePrice;
                    myRow.valor_flete = tarifa * row.qtyPieces;
                    myRow.valor_com_c_imp = tarifa * row.qtyPieces;
                    myRow.valor_com_s_imp = this.round((tarifa * row.qtyPieces) / 1.21);
                    myRow.retiro_a_domicilio = 0;
                    myRow.idretiro_a_domicilio = generalSettings.idRetiroADomicilio;
                    myRow.valor_retiro_domicilio = pricingRow.homeWithdrawal * row.qtyPieces;
                    if (row.homeDelivery) {
                        myRow.envio_domicilio = 1;
                        myRow.valor_entrega_domicilio = pricingRow.homeDelivery * row.qtyPieces;
                    }
                    else {
                        myRow.envio_domicilio = 0;
                        myRow.valor_entrega_domicilio = 0;
                    }
                    saitRequest.push(myRow);
                    createRequest.qty = createRequest.qty + 1;
                }
                else {
                    await this.enabledPlaceRepository.find({
                        where: {
                            place_name: row.enabledPlace,
                        },
                    }).then(async (placeArray) => {
                        const zona = await this.zonesRepository.findOne({
                            cp: addressCpa
                        });
                        if (placeArray.length == 0) {
                            console.log("No existe enabled_place: ", addressCpa);
                        }
                        myRow.idog_lugar_destino = parseInt(placeArray[0].idog);
                        myRow.desc_lugar_destino = row.enabledPlace;
                        await this.tariffRepository.find({
                            where: {
                                account: account,
                                weightFrom: typeorm_1.LessThanOrEqual(row.totalWeight / row.qtyPieces),
                                weightTo: typeorm_1.MoreThanOrEqual(row.totalWeight / row.qtyPieces)
                            },
                        }).then(tariffArray => {
                            const tariff = tariffArray[0];
                            myRow.valor_declarado = 0;
                            myRow.id_seguro = generalSettings.idSeguro;
                            myRow.seguro = tariff.insurance * row.qtyPieces;
                            myRow.letra_comprobante = generalSettings.letraComprobante;
                            myRow.boca_comprobante = generalSettings.bocaComprobante;
                            const tarifa = tariff[zona.zone];
                            myRow.valor_flete = tarifa * row.qtyPieces;
                            myRow.valor_com_c_imp = tarifa * row.qtyPieces;
                            myRow.valor_com_s_imp = this.round((tarifa * row.qtyPieces) / 1.21);
                            myRow.retiro_a_domicilio = 0;
                            myRow.idretiro_a_domicilio = generalSettings.idRetiroADomicilio;
                            myRow.valor_retiro_domicilio = tariff.homeWithdrawal * row.qtyPieces;
                            if (row.homeDelivery) {
                                myRow.envio_domicilio = 1;
                                myRow.valor_entrega_domicilio = tariff.homeDelivery * row.qtyPieces;
                            }
                            else {
                                myRow.envio_domicilio = 0;
                                myRow.valor_entrega_domicilio = 0;
                            }
                            saitRequest.push(myRow);
                            createRequest.qty = createRequest.qty + 1;
                        });
                    });
                }
            }));
            const workbook = xlsx_1.utils.book_new();
            const worksheet = xlsx_1.utils.json_to_sheet(saitRequest);
            xlsx_1.utils.book_append_sheet(workbook, worksheet);
            let myTimeStamp = Date.now();
            let myFilepath = path_1.join(__dirname, `../service-request/tmp/saitfile-${myTimeStamp}.xlsx`);
            xlsx_1.writeFile(workbook, myFilepath);
            if (errorRequest.qty > 0 || warningRequest.qty > 0) {
                const myRow = { createRequest, errorRequest, warningRequest };
                return { "created": false, "data": myRow };
            }
            console.log("SAIT begin");
            await this.createSaitRequest(myFilepath, helper);
            console.log("SAIT finish");
            const myRow = { createRequest, errorRequest, warningRequest };
            return { "created": true, "data": myRow };
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }
    validatedFsrHasErrors(validatedFsr) {
        let hasErrors = false;
        for (let i = 0; i < validatedFsr.length; i++) {
            if (!hasErrors) {
                hasErrors = hasErrors || this.checkFsrRowHasErrors(validatedFsr[i]);
            }
            else {
                return hasErrors;
            }
        }
        return hasErrors;
    }
    checkFsrRowHasErrors(fsrRow) {
        const fieldNames = Object.keys(fsrRow);
        return fieldNames.some(fn => fsrRow[fn].status === "danger");
    }
    async createSaitRequest(myFilepath, helper) {
        console.log("IMPRIMOOOOO VALOOOREEESSS:");
        const { token } = await this.serviceSaitService.saitAccessToken();
        console.log("SAIT token: ", token);
        const upload = await this.serviceSaitService.saitFileUpload(myFilepath, token);
        console.log("SAIT Upload (idarchivo): " + upload.idarchivo);
        if (upload.estado === 1) {
            console.log("SAIT Upload OK!");
            let myids = helper.map(a => a.id);
            await this.saveAllData(myids, { "idfile": upload.idarchivo, "link": upload.link });
            let validate = await this.serviceSaitService.saitValidate(upload.idarchivo, token);
            if (validate.valido) {
                console.log("SAIT Validate OK!");
                let resultado = await this.serviceSaitService.saitValidationResult(upload.idarchivo, token);
                if (!resultado.errorvalidacion) {
                    console.log("SAIT validation errors OK!");
                    let procesar = await this.serviceSaitService.saitProcess(upload.idarchivo, token);
                    console.log("SAIT int process OK!");
                    if (procesar.estado === 1) {
                        let resultadoProceso = await this.serviceSaitService.saitProcessResult(upload.idarchivo, token);
                        if (!resultadoProceso.errorvalidacion) {
                            const saitResult = resultadoProceso.resultado;
                            await Promise.all(saitResult.map(async (result) => {
                                let myServiceRequest = helper.find(o => o.requestId === result.codigoexterno);
                                console.log("comprobante: " + result.comprobante);
                                console.log("delivery: " + JSON.stringify(result.deliveries));
                                let deliveries = "";
                                result.deliveries.forEach(async (row) => {
                                    deliveries = deliveries + row.delivery + ";";
                                });
                                deliveries = deliveries.substr(0, deliveries.length - 1);
                                let delivery = await this.serviceSaitService.saitDeliveryStatus(result.comprobante, token);
                                console.log("status: " + JSON.stringify(delivery.estadodelivery));
                                let estadoDelivery = delivery.estadodelivery;
                                await this.saveData(myServiceRequest.id, { "voucher": result.comprobante, "delivery": deliveries, "status": estadoDelivery.estado, "statusDatetime": estadoDelivery.fechaestado });
                            }));
                        }
                        else {
                            console.log("SAIT process result error");
                        }
                    }
                    else {
                        console.log("SAIT init process error");
                    }
                }
                else {
                    console.log("SAIT validation errors: " + resultado.resultado);
                }
            }
            else {
                console.log("SAIT validate error");
            }
        }
        else {
            console.log("SAIT upload error");
        }
    }
    async saveAllData(ids, newValue) {
        const services = await this.serviceRequestRepository.findByIds(ids);
        return await Promise.all(services.map(async (service) => {
            const updatedAService = this.serviceRequestRepository.merge(service, newValue);
            await this.serviceRequestRepository.save(updatedAService);
        }));
    }
    async saveData(id, newValue) {
        const serviceFound = await this.serviceRequestRepository.findOne({ id });
        if (!serviceFound)
            throw new Error(strings_constants_1.default.noAccount);
        const updatedAService = this.serviceRequestRepository.merge(serviceFound, newValue);
        return await this.serviceRequestRepository.save(updatedAService);
    }
    round(num) {
        var m = Number((Math.abs(num) * 100).toPrecision(15));
        return Math.round(m) / 100 * Math.sign(num);
    }
    async createFormatServiceRequest(fsrDto) {
        const accountId = fsrDto.accountId;
        const fsr = await this.formatSrRepository.findOne({
            where: { accountId: accountId }
        });
        if (fsr) {
            throw new Error("Ya existe un formato de solicitud de servicio para cliente con id " + accountId);
        }
        let requestFields = fsrDto.requestFields;
        const positionsFromDto = this.getPositionsFromDto(requestFields);
        format_sr_positions_validator_1.default.validate(positionsFromDto);
        requestFields = this.transformNumericRequestFields(requestFields);
        const formatSr = await this.formatSrRepository.save({
            format: fsrDto.format,
            separator: fsrDto.separator,
            accountId: accountId,
            quoteChar: fsrDto.quoteChar
        });
        await this.saveFsrFields(formatSr, requestFields);
    }
    transformNumericRequestFields(requestFields) {
        const numericRequestsFieldsDto = this.getNumericRequestFieldsDto(requestFields);
        const transformedNumericRequestsFieldsDto = numeric_field_transformer_1.default.transform(numericRequestsFieldsDto);
        datatype_fields_1.numberFields.forEach(nf => delete requestFields[nf]);
        transformedNumericRequestsFieldsDto.forEach(o => {
            requestFields = Object.assign({}, requestFields, o);
        });
        return requestFields;
    }
    getNumericRequestFieldsDto(requestFields) {
        const numericRequestFieldsDto = [];
        datatype_fields_1.numberFields.forEach(nf => {
            numericRequestFieldsDto.push({ [nf]: requestFields[nf] });
        });
        return numericRequestFieldsDto;
    }
    getPositionsFromDto(requestFields) {
        const res = [];
        const keys = Object.keys(requestFields);
        keys.map(fn => {
            let position = requestFields[fn].position;
            if (position != null)
                res.push(position);
        });
        return res;
    }
    async saveFsrFields(formatSr, requestFields) {
        const keys = Object.keys(requestFields);
        keys.forEach((k) => {
            const algo = this.saveFsrFieldsAux(formatSr, k, requestFields[k]);
        });
    }
    async saveFsrFieldsAux(formatSr, fieldName, field) {
        if (datatype_fields_1.stringFields.includes(fieldName)) {
            this.fieldStringRepository.save({
                fieldName: fieldName,
                position: field.position,
                defaultValue: field.defaultValue,
                length: field.length,
                required: field.required,
                formatSr: formatSr
            });
        }
        else if (datatype_fields_1.numberFields.includes(fieldName)) {
            this.fieldNumberRepositoty.save({
                fieldName: fieldName,
                position: field.position,
                defaultValue: field.defaultValue,
                required: field.required,
                formatSr: formatSr
            });
        }
        else {
            this.fieldBooleanRepository.save({
                fieldName: fieldName,
                position: field.position,
                defaultValue: field.defaultValue,
                required: field.required,
                formatSr: formatSr
            });
        }
    }
    async getFormatLocalitiesXls() {
        return path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx");
    }
    async uploadFormatLocalitiesXls(accountId, file) {
        const account = await this.getAccount(accountId);
        const sourceStream = fs_1.createReadStream(file.path);
        const destinationStream = fs_1.createWriteStream(path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`));
        sourceStream.pipe(destinationStream);
        this.accountLocalityRepository.delete({
            accountId: accountId
        });
        const localitiesToFormat = this.getFormatLocalities(file);
        this.saveFormatLocalities(localitiesToFormat, accountId);
    }
    getFormatLocalities(file) {
        let formatLocalities = new locality_format_file_reader_1.default().readFile(file);
        let errors = [];
        for (let i = 0; i < formatLocalities.length; i++) {
            let ltf = formatLocalities[i];
            if (!(ltf.cp === undefined && ltf.locality === undefined && ltf.province === undefined)) {
                const isValidLTF = locality_to_format_validator_1.default.validate(ltf);
                if (isValidLTF.length !== 0) {
                    errors = errors.concat(format_locality_error_1.formatLocalityError(i + 3, isValidLTF));
                }
            }
        }
        this.getHttpErrorIf(errors.length > 0, common_1.HttpStatus.BAD_REQUEST, errors);
        formatLocalities = formatLocalities.filter(ltf => ltf.locality !== undefined ||
            ltf.cp !== undefined ||
            ltf.province !== undefined);
        if (formatLocalities.length === 0) {
            throw new Error("No se cargó ninguna localidad en la planilla");
        }
        let hasDuplicatesEntries = duplicate_locality_entries_checker_1.default.hasDuplicates(formatLocalities);
        this.getHttpErrorIf(hasDuplicatesEntries, common_1.HttpStatus.BAD_REQUEST, 'Hay entradas repetidas en la planilla');
        return formatLocalities;
    }
    getHttpErrorIf(condition, httpStatus, error) {
        if (condition) {
            throw new common_1.HttpException({
                status: httpStatus,
                error: error,
            }, httpStatus);
        }
    }
    saveFormatLocalities(formatLocalities, accountId) {
        formatLocalities.forEach(ltf => {
            this.saveFormatLocality(ltf, accountId);
        });
    }
    async saveFormatLocality(formatLocality, accountId) {
        const enabledPlace = await this.getEnabledPlace(formatLocality.idog);
        this.accountLocalityRepository.save({
            province: formatLocality.province,
            cp: formatLocality.cp,
            locality: formatLocality.locality,
            enabledPlaceId: enabledPlace[0].id,
            accountId: accountId
        });
    }
    async getEnabledPlace(idog) {
        return this.enabledPlaceRepository.find({
            where: { idog: String(idog) }
        });
    }
    async getAccount(accountId) {
        return this.accountRepository.findOne({
            where: { id: accountId }
        });
    }
    async getFormatServiceRequest(accountId) {
        const formatSr = await this.getFsr(accountId);
        if (!formatSr) {
            this.getHttpErrorIf(!formatSr, common_1.HttpStatus.NOT_FOUND, "No existe un formato de solicitud para el id de cuenta dado");
        }
        const formatSrId = formatSr.id;
        const stringFields = await this.getStringFields(formatSrId);
        const numberFields = await this.getNumberFields(formatSrId);
        const booleanFields = await this.getBooleanFields(formatSrId);
        return entity_field_to_fsr_mapper_1.default.map(stringFields, numberFields, booleanFields, formatSr);
    }
    async getFsr(accountId) {
        return this.formatSrRepository.findOne({ where: { accountId: accountId } });
    }
    async updateFormatServiceRequest(updateFsrDto) {
        const accountId = updateFsrDto.accountId;
        const fsr = await this.getFsr(accountId);
        if (!fsr) {
            throw new Error("No existe un formato de solicitud para el id de cuenta dado");
        }
        let requestFields = updateFsrDto.requestFields;
        format_sr_positions_validator_1.default.validate(this.getPositionsFromDto(requestFields));
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
                fsr.quoteChar = quoteChar;
            }
            this.formatSrRepository.save(fsr);
        }
        if (requestFields !== undefined && Object.keys(requestFields).length !== 0) {
            this.updateFsrRequestFields(accountId, requestFields, fsr.id);
        }
    }
    async updateFsrRequestFields(accoundId, requestFields, formatRequestServiceId) {
        const stringFieldRows = await this.getStringFields(formatRequestServiceId);
        const numberFieldRows = await this.getNumberFields(formatRequestServiceId);
        const booleanFieldRows = await this.getBooleanFields(formatRequestServiceId);
        const requestFieldsKeys = Object.keys(requestFields);
        requestFieldsKeys.map(rfk => {
            let requestField = requestFields[rfk];
            if (datatype_fields_1.stringFields.includes(rfk)) {
                let stringFieldRow = stringFieldRows.filter(sfr => sfr.fieldName === rfk)[0];
                let updatedStringFieldRow = this.updateStringField(stringFieldRow, requestField);
                this.fieldStringRepository.save(updatedStringFieldRow);
            }
            else if (datatype_fields_1.numberFields.includes(rfk)) {
                let numberFieldRow = numberFieldRows.filter(sfr => sfr.fieldName === rfk)[0];
                let updatedNumberFieldRow = this.updateCommonFields(numberFieldRow, requestField);
                this.fieldNumberRepositoty.save(updatedNumberFieldRow);
            }
            else {
                let booleanFieldRow = booleanFieldRows.filter(sfr => sfr.fieldName === rfk)[0];
                let updatedBooleanFieldRow = this.updateCommonFields(booleanFieldRow, requestField);
                this.fieldBooleanRepository.save(updatedBooleanFieldRow);
            }
        });
    }
    updateStringField(stringFieldRow, requestField) {
        stringFieldRow = this.updateCommonFields(stringFieldRow, requestField);
        if (requestField.length !== undefined)
            stringFieldRow.length = requestField.length;
        return stringFieldRow;
    }
    updateCommonFields(fieldRow, requestField) {
        if (requestField.position !== undefined)
            fieldRow.position = requestField.position;
        if (requestField.defaultValue !== undefined)
            fieldRow.defaultValue = requestField.defaultValue;
        if (requestField.required !== undefined)
            fieldRow.required = requestField.required;
        return fieldRow;
    }
    getDTVDefaultServiceRequest() {
        return {
            requestId: data_to_validate_default_sr_1.dtvDefaultSr(false),
            recipientFullname: data_to_validate_default_sr_1.dtvDefaultSr(false),
            docType: data_to_validate_default_sr_1.dtvDefaultSr(false),
            docNumber: data_to_validate_default_sr_1.dtvDefaultSr(false),
            phone: data_to_validate_default_sr_1.dtvDefaultSr(true),
            email: data_to_validate_default_sr_1.dtvDefaultSr(true),
            addressBuilding: data_to_validate_default_sr_1.dtvDefaultSr(true),
            addressFloor: data_to_validate_default_sr_1.dtvDefaultSr(true),
            addressApartment: data_to_validate_default_sr_1.dtvDefaultSr(true),
            enabledPlace: data_to_validate_default_sr_1.dtvDefaultSr(false),
            locality: data_to_validate_default_sr_1.dtvDefaultSr(false),
            province: data_to_validate_default_sr_1.dtvDefaultSr(false),
            cpa: data_to_validate_default_sr_1.dtvDefaultSr(false),
            qtyPieces: {},
            totalWeight: {},
            homeDelivery: data_to_validate_default_sr_1.dtvDefaultSr(false),
            observations: data_to_validate_default_sr_1.dtvDefaultSr(true),
        };
    }
    async getFormatLocalitiesXlsAccount(accountId) {
        const acs = await this.accountLocalityRepository.find({
            where: { accountId: accountId }
        });
        let eps = await this.enabledPlaceRepository
            .createQueryBuilder("ep")
            .innerJoinAndSelect(location_entity_1.LocalityEntity, "l", "ep.place_name = l.enabled_place")
            .where("l.isActive = :isActive", { isActive: true })
            .andWhere("ep.isActive = :isActive", { isActive: true })
            .orderBy("ep.place_name")
            .getRawMany();
        let epsAux = [];
        eps.map(ep => {
            epsAux.push({
                idog: ep.ep_idog,
                placeName: ep.ep_place_name,
                localitySys: ep.ep_locality_name,
                provinceSys: ep.ep_province_name,
                zipCodeSys: ep.l_zip_code
            });
        });
        if (acs.length == 0) {
            const workbook = xlsx_1.readFile(path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const range = xlsx_1.utils.decode_range(sheet['!ref']);
            for (let indexRow = 2; indexRow < range.e.r; indexRow++) {
                for (let indexColumn = 0; indexColumn < 5; indexColumn++)
                    delete sheet[xlsx_1.utils.encode_cell({ c: indexColumn, r: indexRow })];
            }
            xlsx_1.utils.sheet_add_json(sheet, epsAux, { origin: "A3", skipHeader: true });
            xlsx_1.writeFile(workbook, path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
            return path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx");
        }
        else {
            const options = {
                root: path_1.join(__dirname, "/../../shared/template-files/"),
                file: `formato_localidades_custom_${accountId}.xlsx`
            };
            try {
                if (fs_1.readdirSync(options.root).includes(options.file)) {
                    const workbook = xlsx_1.readFile(path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`));
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const range = xlsx_1.utils.decode_range(sheet['!ref']);
                    for (let indexRow = 2; indexRow < range.e.r; indexRow++) {
                        for (let indexColumn = 0; indexColumn < 8; indexColumn++)
                            delete sheet[xlsx_1.utils.encode_cell({ c: indexColumn, r: indexRow })];
                    }
                    xlsx_1.utils.sheet_add_json(sheet, epsAux, { origin: "A3", skipHeader: true });
                    let epsAcsMap = [];
                    acs.map(epAccount => {
                        if (eps.find(enabledPlace => enabledPlace.ep_id == epAccount.enabledPlaceId) !== undefined) {
                            epsAcsMap.push({
                                Localidad: epAccount.locality,
                                Provincia: epAccount.province,
                                CP: epAccount.cp
                            });
                        }
                    });
                    xlsx_1.utils.sheet_add_json(sheet, epsAcsMap, { origin: "F3", skipHeader: true });
                    xlsx_1.writeFile(workbook, path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`));
                    return path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`);
                }
                else {
                    const workbook = xlsx_1.readFile(path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
                    const sheet = workbook.Sheets[workbook.SheetNames[0]];
                    const range = xlsx_1.utils.decode_range(sheet['!ref']);
                    for (let indexRow = 2; indexRow < range.e.r; indexRow++) {
                        for (let indexColumn = 0; indexColumn < 5; indexColumn++)
                            delete sheet[xlsx_1.utils.encode_cell({ c: indexColumn, r: indexRow })];
                    }
                    xlsx_1.utils.sheet_add_json(sheet, epsAux, { origin: "A3", skipHeader: true });
                    xlsx_1.writeFile(workbook, path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
                    return path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx");
                }
            }
            catch (error) {
                console.log(error);
                const workbook = xlsx_1.readFile(path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const range = xlsx_1.utils.decode_range(sheet['!ref']);
                for (let indexRow = 2; indexRow < range.e.r; indexRow++) {
                    for (let indexColumn = 0; indexColumn < 5; indexColumn++)
                        delete sheet[xlsx_1.utils.encode_cell({ c: indexColumn, r: indexRow })];
                }
                xlsx_1.utils.sheet_add_json(sheet, epsAux, { origin: "A3", skipHeader: true });
                xlsx_1.writeFile(workbook, path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx"));
                return path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, "planilla_formato_localidades.xlsx");
            }
        }
    }
    getXlsLocalitiesWorkbook(data) {
        const workbook = xlsx_1.utils.book_new();
        const worksheet = xlsx_1.utils.json_to_sheet([]);
        worksheet["!merges"] = [];
        worksheet["!merges"].push(xlsx_1.utils.decode_range("A1:E1"));
        worksheet["!merges"].push(xlsx_1.utils.decode_range("F1:H1"));
        xlsx_1.utils.sheet_add_aoa(worksheet, [["Lugares habilitados por el sistema"]], { origin: "A1" });
        xlsx_1.utils.sheet_add_aoa(worksheet, [["Carga personalizada por el cliente"]], { origin: "F1" });
        xlsx_1.utils.sheet_add_aoa(worksheet, [["Idog", "Lugar", "Localidad", "Provincia", "CP", "Localidad", "Provincia", "CP"]], { origin: "A2" });
        xlsx_1.utils.sheet_add_json(worksheet, data, { origin: "A3", skipHeader: true });
        xlsx_1.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
        return workbook;
    }
    async updateFormatLocalitiesXlsAccount(accountId, file) {
        const acs = await this.accountLocalityRepository.find({
            where: { accountId: accountId }
        });
        if (acs.length === 0) {
            throw new Error("No se cargó el formato de localidades para el id de la cuenta dado");
        }
        const sourceStream = fs_1.createReadStream(file.path);
        const destinationStream = fs_1.createWriteStream(path_1.join(__dirname, "../../../", constants_1.TEMPLATE_FILES_DIR, `formato_localidades_custom_${accountId}.xlsx`));
        sourceStream.pipe(destinationStream);
        const formatLocalitiesToUpdate = this.getFormatLocalities(file);
        this.accountLocalityRepository.remove(acs);
        this.saveFormatLocalities(formatLocalitiesToUpdate, accountId);
        return 'foo';
    }
    async getLocalitiesByAccountId(accountId) {
        const acs = await this.accountLocalityRepository.find({
            where: { accountId: accountId }
        });
        var result = acs.length === 0 ? '{ "exists": false}' : '{ "exists": true}';
        return JSON.parse(result);
    }
};
ServiceRequestService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(service_request_entity_1.ServiceRequestEntity)),
    __param(1, typeorm_2.InjectRepository(general_settings_entity_1.GeneralSettingsEntity)),
    __param(2, typeorm_2.InjectRepository(tariff_entity_1.TariffEntity)),
    __param(3, typeorm_2.InjectRepository(zonescp_entity_1.ZonesEntity)),
    __param(4, typeorm_2.InjectRepository(account_entity_1.AccountEntity)),
    __param(5, typeorm_2.InjectRepository(location_entity_1.LocalityEntity)),
    __param(6, typeorm_2.InjectRepository(enabled_places_entity_1.EnabledPlaceEntity)),
    __param(7, typeorm_2.InjectRepository(format_sr_entity_1.default)),
    __param(8, typeorm_2.InjectRepository(field_number_sr_entity_1.default)),
    __param(9, typeorm_2.InjectRepository(field_string_sr_entity_1.default)),
    __param(10, typeorm_2.InjectRepository(field_boolean_sr_entity_1.default)),
    __param(11, typeorm_2.InjectRepository(account_locality_entity_1.default)),
    __param(12, typeorm_2.InjectRepository(planilla_excel_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        services_sait_service_1.ServicesSaitService,
        format_enabled_place_finder_1.default,
        default_enabled_place_finder_1.default,
        default_service_request_validator_1.default,
        format_service_request_validator_1.default,
        update_fsr_validator_1.default])
], ServiceRequestService);
exports.ServiceRequestService = ServiceRequestService;
//# sourceMappingURL=service-request.service.js.map