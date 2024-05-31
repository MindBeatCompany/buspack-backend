import {
    Body,
    Controller,
    Get,
    Header,
    HttpStatus,
    Param,
    Post, Query, Req,
    Res, UploadedFile, UseInterceptors,
} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { AppResource } from "src/shared/config/app.roles";
import Auth from "src/shared/decorators/auth.decorator";
import returnMessage from "src/shared/return-messages";

import {ServicesSaitService} from "./services-sait.service";
import {SaitResponseAuthInterface} from "./interfaces/sait-response-auth.interface";
import {SaitAuthDto} from "./dto/sait-auth.dto";
import {ServiceRequestEntity} from "../service-request/entities/service-request.entity";
import {Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {FileInterceptor} from "@nestjs/platform-express";
import {
    SaitResponseInterface, SaitResponseStatusDeliveryInterface, SaitResponseStatusInterface,
    SaitResponseUploadInterface,
    SaitResponseValidateInterface,
    SaitResponseValidationResultInterface
} from "./interfaces";
import { Code } from "typeorm";
import { AccountService } from "../account/account.service";

@ApiTags("Services Sait")
@Controller('services-sait')
export class ServicesSaitController {
    constructor(private readonly service: ServicesSaitService, private readonly acountService: AccountService) {}

    @ApiOperation({ summary: "Get token SAIT" })
    @Get('/token')
    @Auth({
         action: "read",
         possession: "own",
         resource: AppResource.SAIT_SERVICES,
    })
    public async saitAccessToken(
        @Res() res: any
    ) : Promise<any>  {
        //timestamp: new Date().toISOString(),
        return await this.service.saitAccessToken()
            .then(async (result) => {
                return await res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    success: true,
                    data: result as SaitResponseAuthInterface
                });
            })
            .catch(async (error) => {
                return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    success: false,
                    data: {
                         message: error.errors
                    }
                });
            });
    }

    @ApiOperation({ summary: "Upload file to SAIT" })
    @Auth({
        action: "read",
        possession: "own",
        resource: AppResource.SAIT_SERVICES,
    })
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file',{ dest: __dirname + "/tmp" }))
    public async uploadFile(@UploadedFile() file: Express.Multer.File,@Req() req: any, @Res() res: any) : Promise<any>  {

        return await this.service.saitFileUpload(file.path, req.body.token)
            .then(async (result) => {
                return await res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    success: true,
                    data: result as SaitResponseUploadInterface
                });
            })
            .catch(async (error) => {
                console.log("error");
                return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    success: false,
                    data: {
                        message: error.errors
                    }
                });
            });
    }

    @ApiOperation({ summary: "Validate the provided file and transform it for processing" })
    @Auth({
        action: "read",
        possession: "own",
        resource: AppResource.SAIT_SERVICES,
    })
    @Post('/validate')
    public async saitValidate(
        @Req() req: any, @Res() res: any
    ) : Promise<any>  {
        return await this.service.saitValidate(req.body.idarchivo, req.body.token)
            .then(async (result) => {
                return await res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    success: true,
                    data: result as SaitResponseValidateInterface
                });
            })
            .catch(async (error) => {
                return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    success: false,
                    data: {
                        message: error.errors
                    }
                });
            });
    }

    @ApiOperation({ summary: "Returns the result of the last process carried out to the records of the file (validate / process)" })
    @Auth({
        action: "read",
        possession: "own",
        resource: AppResource.SAIT_SERVICES,
    })
    @Post('/validation-result')
    public async saiValidationResult(
        @Req() req: any, @Res() res: any
    ) : Promise<any>  {
        return await this.service.saitValidationResult(req.body.idarchivo, req.body.token)
            .then(async (result) => {
                return await res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    success: true,
                    data: result as SaitResponseValidationResultInterface
                });
            })
            .catch(async (error) => {
                return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    success: false,
                    data: returnMessage(error.message)
                });
            });
    }

    @ApiOperation({ summary: "Starts the import process of the provided file." })
    @Auth({
        action: "read",
        possession: "own",
        resource: AppResource.SAIT_SERVICES,
    })
    @Post('/process')
    public async saitProcess(
        @Req() req: any, @Res() res: any
    ) : Promise<any>  {
        return await this.service.saitProcess(req.body.idarchivo, req.body.token)
            .then(async (result) => {
                return await res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    success: true,
                    data: result as SaitResponseInterface
                });
            })
            .catch(async (error) => {
                return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    success: false,
                    data: returnMessage(error.message)
                });
            });
    }

    @ApiOperation({ summary: "Returns the result of the last process carried out to the records of the file (validate / process)" })
    @Auth({
        action: "read",
        possession: "own",
        resource: AppResource.SAIT_SERVICES,
    })
    @Post('/process-result')
    public async saitProcessResult(
        @Req() req: any, @Res() res: any
    ) : Promise<any>  {
        return await this.service.saitProcessResult(req.body.idarchivo, req.body.token)
            .then(async (result) => {
                return await res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    success: true,
                    data: result as SaitResponseValidationResultInterface
                });
            })
            .catch(async (error) => {
                return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    success: false,
                    data: returnMessage(error.message)
                });
            });
    }

    @ApiOperation({ summary: "Returns the status of the import process of the provided file." })
    @Auth({
        action: "read",
        possession: "own",
        resource: AppResource.SAIT_SERVICES,
    })
    @Post('/status')
    public async saitStatus(
        @Req() req: any, @Res() res: any
    ) : Promise<any>  {
        return await this.service.saitStatus(req.body.idarchivo, req.body.token)
            .then(async (result) => {
                return await res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    success: true,
                    data: result as SaitResponseStatusInterface
                });
            })
            .catch(async (error) => {
                return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    success: false,
                    data: returnMessage(error.message)
                });
            });
    }

    @ApiOperation({
        summary: "Obtains a delivery status, through the external code, the receipt number or the delivery number." })
    @Auth({
        action: "read",
        possession: "own",
        resource: AppResource.SAIT_SERVICES,
    })
    @Post('/status-delivery')
    public async saitStatusDelivery(
        @Req() req: any, @Res() res: any
    ) : Promise<any>  {
        return await this.service.saitDeliveryStatus(req.body.numero, req.body.token)
            .then(async (result) => {
                return await res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    success: true,
                    data: result as SaitResponseStatusDeliveryInterface
                });
            })
            .catch(async (error) => {
                return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    success: false,
                    data: returnMessage(error.message)
                });
            });
    }

    @ApiOperation({ summary:"Get customer information by a code or a cuil."})
    @Auth({
        action:"read",
        possession: "own",
        resource: AppResource.SAIT_SERVICES
    })
    @Get('/cuit')
    public async getCustomerByCuil(@Query('code') code, @Req() req:any, @Res() res:any): Promise<any>{
        const token = await this.service.saitAccessToken();
        
        return await this.service.getCustomerAccountByCuil(code, token.token)
        .then(async (result) => {
            return await res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                success: true,
                data: result
            });
        })
        .catch(async (error) => {
            return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                data: returnMessage(error.message)
            });
        });
    }
}
