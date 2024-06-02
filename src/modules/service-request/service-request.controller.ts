import {
  Body,
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppResource } from "src/shared/config/app.roles";
import Auth from "src/shared/decorators/auth.decorator";
import returnMessage from "src/shared/return-messages";
import { ServiceRequestEntity } from "./entities/service-request.entity";
import { ServiceRequestService } from "./service-request.service";
import { CreateServiceRequestDto } from './dtos/create-service-request.dto'
import { CreateFormatServiceRequestDto } from "./dtos/format-service-request/create-format-service-request.dto"
import { join } from "path";
import UpdateFormatServiceRequestDto from "./dtos/format-service-request/update-format-service-request.dto";
import { diskStorage } from "multer";


@ApiTags("Service Request")
@Controller("service-request")
export class ServiceRequestController {
  constructor(private readonly serviceServRequest: ServiceRequestService) {}

  @Get()
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  public async getAllServiceRequest(
    @Res() res: any
  ): Promise<any> {
    return this.serviceServRequest.getAll()
    .then(async (result) => {
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: result
      })
    })
    .catch(async (error)=>{
      return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        data: error
      })
    })
  }

  @Get('print-label')
  @Auth({
    action:"read",
    possession:"own",
    resource: AppResource.SERVICE_REQUEST,
  })
  public async getByRequestIdVoucherAndDelivery(
    @Query('request-id') requestId:string,
    @Query('voucher') voucher:string,
    @Query('delivery') delivery:string,
    @Query('dateFrom') dateFrom:string,
    @Query('dateTo') dateTo:string,
    @Res() res: any
  ): Promise<any> {
    const { user } = res.req;
    const { account } = user;
    return this.serviceServRequest.getByRequestIdVoucherAndDelivery(requestId, voucher, delivery, account, dateFrom, dateTo)
    .then(async (result) => {
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: result
      })
    })
    .catch(async (error)=>{
      return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        data: error
      })
    })
  }

  @Get('query')
  @Auth({
    action:"read",
    possession:"own",
    resource: AppResource.SERVICE_REQUEST,
  }) // Realiza una query de lo que va a imprimir en pantalla de: (Le pega a la api, actualiza en BD entonces despues va y pide solo lo que necesita, por ende actualizo todo al divino boton y trajo todo al divino  boton).
  public async getByQuery(
    @Query('request-id') requestId:string,
    @Query('voucher') voucher:string,
    @Query('delivery') delivery:string,
    @Query('fromDate') fromDate:string,
    @Query('toDate') toDate:string,
    @Res() res: any
  ): Promise<any> {
    const { user } = res.req;
    const { account } = user;
    
    
    return this.serviceServRequest.getByQuery(requestId, voucher, delivery, fromDate, toDate, account)
    .then(async (result) => {
      this.serviceServRequest.updateRequestsBetweenDates(fromDate,toDate, account);
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: result
      })

    })
    .catch(async (error)=>{
      console.error(error);
      return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        data: error
      })
    })
  }

  @Post("/upload")
  @Auth({
    action: "create",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  @UseInterceptors(FileInterceptor("file", {
      storage: diskStorage({
        destination: __dirname + "/sr-files",
        filename: (req, file, callback) => {
        const filename = Date.now() + "_" + file.originalname ;
        callback(null, filename)
      }})
  }))
  public async uploadServiceRequest(
    @Res() res: any,
    @UploadedFile() file: any,
    @Query('is-standard-format') isStandardFormat: string
  ): Promise<ServiceRequestEntity> {
    const { user } = res.req;
    const { account } = user;
    const isStandard = isStandardFormat === "true";
    // TODO asegurar que sea un application/vnd.ms-excel
    return this.serviceServRequest
    .uploadFile(file, account, isStandard)
    .then(async (result) => {
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: result,
      });
    })
    .catch(async (error) => {
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: false,
        data: returnMessage(error.message),
      });
    });
  }

  @Get("/download/planilla")
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
    @Header("Content-type", "application/vnd.ms-excel")
  public downloadTemplateFile(@Res() res: any) {
    return this.serviceServRequest
      .downloadFile()
      .then((result) => {
        res.setHeader('Content-disposition', 'attachment; filename=template.xls');
        res.end(result, 'base64');
      })
      .catch((error) => {
        res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: false,
          data: returnMessage(error.message),
        });
      });
  }

  @ApiOperation({ summary: "Create" })
  @Post("/create")
  @Auth({
    action: "create",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  public async createRequest(
    @Res() res: any,
    @Body() body: CreateServiceRequestDto[],
    @Query('is-standard-format') isStandardFormat: string
  ){
    const { user } = res.req;
    const { account } = user;
    return await this.serviceServRequest
      .createRequest(body,account, isStandardFormat)
      .then(async (result) => {
        if (result.created){
          return await res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            success: true,
            data: result.data,
          });
        }else{
          return await res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            success: false,
            data: result.data,
          });
        }

      })
      .catch(async (error) => {
        console.log("catch error: ", JSON.stringify(error));
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: false,
          data: returnMessage(error.message),
        });
      });
  }

  @ApiOperation({ summary: "Create format request service for accounts"})
  @Auth({
    action: "create",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  @Post('format-request')
  public async createFormatServiceRequest(
    @Res() res: any,
    @Body() body: CreateFormatServiceRequestDto
  ) {
    return await this.serviceServRequest
      .createFormatServiceRequest(body)
      .then(async (result)=> {
        return await res.status(HttpStatus.CREATED).json({
          success: true
        });
      })
      .catch(async (error) => {
        return res.status(HttpStatus.OK).json({
          success: false,
          data: returnMessage(error.message)
        })
      });
  }

  @ApiOperation({ summary: "Get format request service for an account"})
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  @Get("format-request")
  public async getFormatServiceRequest(
    @Res() res: any,
    @Query('accountId') accountId: number
  ) {
    return this.serviceServRequest
      .getFormatServiceRequest(accountId)
      .then(async (result) => {
        return res.status(HttpStatus.OK).json({
          success: true,
          data: result
        })
      })
      .catch(err => {
        const errorClassname = err.constructor.name;
        const data = errorClassname === 'HttpException' ? err.response.error : returnMessage(err.message);
        const status = errorClassname === "HttpException" ? err.status : HttpStatus.OK;
        return res.status(status).json({
          success: false,
          data: data
        });
      })
  }

  @ApiOperation({ summary: "Update format request service for accounts"})
  @Auth({
    action: "update",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  @Put("format-request")
  public async updateFormatServiceRequest(
    @Res() res: any,
    @Body() body: UpdateFormatServiceRequestDto,
  ) {
    return this.serviceServRequest
      .updateFormatServiceRequest(body)
      .then(result => {
        return res.status(HttpStatus.OK).json({
          success: true
        });
      })
      .catch(err => {
        const errorClassname = err.constructor.name;
        const data = errorClassname === 'HttpException' ? err.response.error : returnMessage(err.message);
        const status = errorClassname === "HttpException" ? err.status : HttpStatus.OK;
        return res.status(status).json({
          success: false,
          data: data
        });
      })
  }

  @ApiOperation({ summary: "Get xls to format localities"})
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  @Get("/xls-format-localities/download")
  @Header("Content-Type", "application/vnd.ms-excel")
  public getFormatLocalitiesXls(
    @Res() res: any,
    @Query("accountId") accountId?: number
  ) {
    return this.serviceServRequest.getFormatLocalitiesXlsAccount(accountId)
      .then(xlsFile => {
        return res.download(xlsFile)
      })
      .catch(err => {
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: false,
          data: returnMessage(err.message),
        });
      });     
  }

  @ApiOperation({ summary: "Upload format localities xls "})
  @Auth({
    action: "create",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  @Post("/xls-format-localities/upload")
  @UseInterceptors(FileInterceptor("formatLocalitiesXls", { dest: join(__dirname, "tmp")}))
  public async uploadFormatLocalitiesXls(
    @Res() res: any,
    @Query("accountId") accountId: number,
    @UploadedFile() file: any
  ) {
    return this.serviceServRequest.uploadFormatLocalitiesXls(accountId, file)
      .then(() => { 
        return res.status(HttpStatus.OK).json({
          success: true
        })
      })
      .catch(err => {
        const errorClassname = err.constructor.name
        return res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: false,
          data: errorClassname === 'HttpException' ? err.response.error : returnMessage(err.message)
        });
      })
  }

  @ApiOperation({ summary: "Get xls format localities uploaded by an user with with admin role" })
  @Get("/xls-format-localities")
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  @Header("Content-Type", "application/json")
  public getFormatLocalitiesXlsAccount(
    @Res() res: any,
    @Query("accountId") accountId: number
  ) {
    return this.serviceServRequest.getLocalitiesByAccountId(accountId)
      .then(result => {
        return res.status(HttpStatus.OK).json(
          result)
      }).catch(err => {
        return res.json({
          success: false,
          data: returnMessage(err.message)
        })
      })
  }

  @ApiOperation({ summary: "Update xls format localities uploaded by an user with with admin role" })
  @Auth({
    action: "update",
    possession: "own",
    resource: AppResource.SERVICE_REQUEST,
  })
  @Put("/xls-format-localities")
  @UseInterceptors(FileInterceptor("formatLocalitiesXls", { dest: join(__dirname, "tmp")}))
  public updateFormatLocalitiesXlsAccount(
    @Res() res: any,
    @Query("accountId") accountId: number,
    @UploadedFile() file: any
  ) {
    return this.serviceServRequest.updateFormatLocalitiesXlsAccount(accountId, file)
      .then(() => {
        return res.json({
          success: true
        })
      })
      .catch(err => {
        return res.json({
          success: false,
          data: returnMessage(err.message)
        })
      })
  }
}
