import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { AppResource } from "src/shared/config/app.roles";
import Auth from "src/shared/decorators/auth.decorator";
import returnMessage from "src/shared/return-messages";
import { UserCreatedDto } from "../user/dtos";
import { AccountService } from "./account.service";
import {
  AccountCreatedDto,
  DeactivateAccountDto,
  UpdateAccountDto,
  AccountTypeTariffDto,
} from "./dtos";
import { ChangeHasCustomPricingFieldRequest } from "./dtos/chage-has-custom-pricing-field";

@ApiTags("Accounts")
@Controller("account")
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: "Deactivate selected accounts" })
  @Put("/deactivate")
  @Auth({
    possession: "any",
    action: "update",
    resource: AppResource.ACCOUNT,
  })
  public async deactivateAccounts(
    @Res() res: any,
    @Body() body: DeactivateAccountDto
  ): Promise<AccountCreatedDto[]> {
    return await this.accountService
      .deactivate(body)
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

  @ApiOperation({ summary: "Get all accounts" })
  @Get()
  @Auth({ possession: "any", action: "read", resource: AppResource.ACCOUNT })
  public async getAll(@Res() res: any): Promise<AccountCreatedDto[]> {
    return await this.accountService
      .findAll()
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

  @ApiOperation({ summary: "Get all Users on account" })
  @Get("/:id/users")
  @Auth({ possession: "any", action: "read", resource: AppResource.ACCOUNT })
  public async getAllUsers(
    @Res() res: any,
    @Param("id") id: string
  ): Promise<UserCreatedDto[]> {
    return await this.accountService
      .getUsers(parseInt(id))
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

  @ApiOperation({ summary: "Update Company Name" })
  @Put("/:id")
  @Auth({ possession: "any", action: "update", resource: AppResource.ACCOUNT })
  public async update(
    @Res() res: any,
    @Param("id") id: string,
    @Body() body: UpdateAccountDto
  ): Promise<AccountCreatedDto> {
    return await this.accountService
      .update(parseInt(id), body)
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
          success: true,
          data: returnMessage(error.message),
        });
      });
  }

  @ApiOperation({ summary: "Update tarrif type" })
  @Put("/tarrifType/:id")
  @Auth({ possession: "any", action: "update", resource: AppResource.ACCOUNT })
  public async updateTarrifType(
    @Res() res: any,
    @Param("id") id: string,
    @Body() body: AccountTypeTariffDto
  ): Promise<AccountTypeTariffDto> {
    return await this.accountService
      .updateTariffType(parseInt(id), body)
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
          success: true,
          data: returnMessage(error.message),
        });
      });
  }

  @ApiOperation({ summary: "Modify an account has a custom pricing field" })
  @ApiParam({
    name: 'id',
    required: true,
    example: 1
  })
  @Put("/:id/pricings")
  @Auth({
    possession: "any",
    action: "update",
    resource: AppResource.ACCOUNT,
  })
  public async changeHasCustomPricing(
    @Res() res: any,
    @Param("id") id: string,
    @Body() body: ChangeHasCustomPricingFieldRequest
  ): Promise<any> {
    return await this.accountService
    .changeHasCustomPricing(parseInt(id), body.hasCustom)
    .then(async (result) => {
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: result,
      });
    })
    .catch(async (error) => {
      return await res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        success: true,
        data: returnMessage(error.message),
      });
    });
  }
}
