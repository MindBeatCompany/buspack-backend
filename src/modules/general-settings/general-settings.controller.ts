import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AppResource } from "src/shared/config/app.roles";
import messages from "src/shared/config/strings-constants";
import Auth from "src/shared/decorators/auth.decorator";
import { CreateGeneralSettingsDTO } from "./dtos/create-general-settings.dto";
import { UpdateGeneralSettingsDTO } from "./dtos/update-general-settings.dto";
import { GeneralSettingsEntity } from "./entities/general-settings.entity";
import { GeneralSettingsService } from "./general-settings.service";

@Controller("general-settings")
export class GeneralSettingsController {
  constructor(
    private readonly generalSettingsService: GeneralSettingsService
  ) {}

  @ApiOperation({ summary: "Get settings" })
  @Get()
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.SETTINGS,
  })
  public async getSettings(@Res() res: any): Promise<GeneralSettingsEntity> {
    try {
      const settings = await this.generalSettingsService.findById();
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: settings,
      });
    } catch (error) {
      return await res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: error,
          message: messages.generalSettingsError,
          error: error,
        });
    }
  }

  @ApiOperation({ summary: "Create settings" })
  @Auth({
    action: "create",
    possession: "own",
    resource: AppResource.SETTINGS,
  })
  @Post()
  public async createSettings(
    @Res() res: any,
    @Body() body: CreateGeneralSettingsDTO
  ): Promise<GeneralSettingsEntity> {
    try {
      const settings = await this.generalSettingsService.create(body);
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: settings,
      });
    } catch (error) {
      return await res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: error,
          message: messages.generalSettingsError,
          error: error,
        });
    }
  }

  @ApiOperation({ summary: "Update settings" })
  @Put()
  @Auth({
    action: "update",
    possession: "own",
    resource: AppResource.SETTINGS,
  })
  public async uploadSettings(
    @Res() res: any,
    @Body() body: UpdateGeneralSettingsDTO
  ): Promise<GeneralSettingsEntity> {
    try {
    const settings = await this.generalSettingsService.update(body);
    return await res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      success: true,
      data: settings,
    });
  } catch (error) {
    return await res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        data: error,
        message: messages.generalSettingsError,
        error: error,
      });
  }
  }
}
