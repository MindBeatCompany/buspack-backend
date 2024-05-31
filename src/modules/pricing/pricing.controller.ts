import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MinimalAccountDto } from './dtos/response/get-minimal-accounts-response.dto';
import { UpdatePricesDto } from './dtos/request/update-prices.dto';
import { PricingService } from './pricing.service';
import { CreatePricingDto } from './dtos/request/create-pricing.dto';
import { MinimalLocalityDto } from './dtos/response/get-minimal-localities-response.dto';
import { PricingToCloneDto } from './dtos/response/get-pricing-to-clone.dto';
import Auth from 'src/shared/decorators/auth.decorator';
import { AppResource } from 'src/shared/config/app.roles';

@ApiTags("Pricings")
@Controller('pricings')
export class PricingController {

  constructor(private readonly pricingService: PricingService) { }

  // POST
  @ApiOperation({ summary: "Create a pricing to selected account" })
  @Post()
  @Auth({
    action: "create",
    possession: "own",
    resource: AppResource.PRICING,
  })
  public async createPricingTable(
    @Res() res: any,
    @Body() body: CreatePricingDto
  ): Promise<any> {
    return this.pricingService.create(body)
      .then(async (result) => {
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result
        })
      })
      .catch(async (error) => {
        return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: error.message
        })
      });
  }

  // GET
  @ApiOperation({ summary: "Get account current pricing full data" })
  @Get("/accounts/:accountId/current")
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.PRICING,
  })
  public async getAccountCurrentPricing(
    @Param("accountId") accountId: number,
    @Res() res: any
  ): Promise<any> {
    return this.pricingService.getPricingFrom(accountId)
      .then(async (result) => {
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result
        })
      })
      .catch(async (error) => {
        return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: error,
          message: error.message
        })
      });
  }

  @ApiOperation({ summary: "Obtains all pricing data to clone" })
  @ApiOkResponse({
    type: PricingToCloneDto,
    isArray: true
  })
  @Get("/accounts/:accountId")
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.PRICING,
  })
  public async getInfoToClone(
    @Param("accountId") accountId: number,
    @Res() res: any
  ): Promise<any> {
    return this.pricingService.getPricingToClone(accountId)
      .then(async (result) => {
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result
        })
      })
      .catch(async (error) => {
        return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: error,
          message: error.message
        })
      });
  }

  @Get("/accounts")
  @ApiOperation({ summary: "Get all accounts with a current pricing" })
  @ApiOkResponse({
    type: MinimalAccountDto,
    isArray: true
  })
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.PRICING,
  })
  public async getAllAccounts(
    @Res() res: any
  ): Promise<any> {
    return this.pricingService.getAccountsWithPricing()
      .then(async (result) => {
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result
        })
      })
      .catch(async (error) => {
        return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: error,
          message: error.message
        })
      });
  }

  @ApiOperation({ summary: "Get all localities with zip code, locality name and province name" })
  @Get("/localities")
  @ApiOkResponse({
    type: MinimalLocalityDto,
    isArray: true
  })
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.PRICING,
  })
  public async getAllLocalities(
    @Res() res: any
  ): Promise<any> {
    return this.pricingService.getAllLocalities()
      .then(async (result) => {
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result
        })
      })
      .catch(async (error) => {
        return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: error,
          message: error.message
        })
      });
  }

  // PUT
  @ApiOperation({ summary: "Update by percentage or fixed amount account's current pricing table" })
  @Put("/accounts/:accountId")
  @Auth({
    action: "update",
    possession: "own",
    resource: AppResource.PRICING,
  })
  public async updatePricingTable(
    @Body() body: UpdatePricesDto,
    @Param("accountId") accountId: number,
    @Res() res: any,
  ): Promise<any> {
    return this.pricingService.updatePricingTableFrom(accountId, body)
      .then(async (result) => {
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result
        })
      })
      .catch(async (error) => {
        return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: error.message
        })
      });
  }
}
