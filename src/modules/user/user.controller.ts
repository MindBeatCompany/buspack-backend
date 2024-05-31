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
import { InjectRolesBuilder, RolesBuilder } from "nest-access-control";
import { join } from "path";
import { AppResource, AppRoles } from "src/shared/config/app.roles";
import Auth from "src/shared/decorators/auth.decorator";
import returnMessage from "src/shared/return-messages";
import {
  UpdateUserDto,
  PreferenceUserDto,
  UpdatePreferenceDto,
  UpdateStatusUserDto,
  UserCreatedDto,
  CreateUserDto,
  CreateMultiUserDto,
  PassResetDto,
} from "./dtos";
import { UserEntity } from "./entities/user.entity";
import { UserService } from "./user.service";
@ApiTags("User")
@Controller("users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @ApiOperation({ summary: "Get all users" })
  @Get()
  @Auth({
    possession: "any",
    action: "read",
    resource: AppResource.USER,
  })
  public async getAllUser(@Res() res: any): Promise<UserCreatedDto[]> {
    const { user } = res.req;
    if (user.roles === AppRoles.ADMIN) {
      return await this.userService
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
    } else {
      return await this.userService
        .findAll(user)
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
  }

  //@Get("/:id")
  @Auth({
    possession: "own",
    action: "read",
    resource: AppResource.USER,
  })
  public async getOneUser(
    @Param("id") id: string,
    @Res() res: any
  ): Promise<UserEntity> {
    const { user } = res.req;
    if (this.rolesBuilder.can(user.roles).readAny(AppResource.USER).granted) {
      return await this.userService
        .findOne(parseInt(id))
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
    } else {
      return await this.userService
        .findOne(parseInt(id), user)
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
  }

  @ApiOperation({ summary: "Update Tariff" })
  @Put("/tariff")
  @Auth({ action: "update", possession: "any", resource: AppResource.USER })
  @UseInterceptors(
    FileInterceptor("file", { dest: join(__dirname, "../account/tarifarios") })
  )
  public async updateTariff(
    @Query("accountid") accountId: number,
    @Res() res: any,
    
    @UploadedFile("file") file: Express.Multer.File
  ): Promise<any> {
    return await this.userService
      .updateTariff(file, accountId)
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
          data: error.response || error.message,
        });
      });
  }

  @ApiOperation({ summary: "Password Reset" })
  @Put("/reset")
  @Auth({ action: "update", possession: "any", resource: AppResource.USER })
  public async passwordReset(
    @Res() res: any,
    @Body() body: PassResetDto
  ): Promise<CreateUserDto[]> {
    return await this.userService
      .userPasswordReset(body)
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
          data: error,
        });
      });
  }

  @ApiOperation({ summary: "Update One User" })
  @Put("/:id")
  @Auth({
    possession: "any",
    action: "update",
    resource: AppResource.USER,
  })
  public async updateUser(
    @Param("id") id: string,
    @Body() body: UpdateUserDto,
    @Res() res: any
  ): Promise<UserCreatedDto> {
    const { user } = res.req;
    return await this.userService
      .update(parseInt(id), body, user)
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
          data: error.response || returnMessage(error.message),
        });
      });
  }

  @ApiOperation({ summary: "Update Preferences" })
  @Put("/:id/preferences")
  @Auth({
    possession: "own",
    action: "update",
    resource: AppResource.USER,
  })
  public async updatePreferences(
    @Param("id") id: string,
    @Body() body: UpdatePreferenceDto,
    @Res() res: any
  ): Promise<PreferenceUserDto> {
    const { user } = res.req;

    if (user.roles === AppRoles.ADMIN) {
      return await this.userService
        .updateUserPreferences(parseInt(id), body)
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
    } else {
      return await this.userService
        .updateUserPreferences(parseInt(id), body, user)
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
  }

  @ApiOperation({ summary: "Change Status" })
  @Post("/status")
  @Auth({ possession: "any", action: "update", resource: AppResource.USER })
  public async setUserStatus(
    @Res() res: any,
    @Body() body: UpdateStatusUserDto
  ): Promise<UserCreatedDto[]> {
    const { user } = res.req;
    return await this.userService
      .setStatus(body, user)
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

  @ApiOperation({ summary: "Get Preferences" })
  @Get("/:id/preferences")
  @Auth({
    possession: "own",
    action: "read",
    resource: AppResource.USER,
  })
  public async getPreferences(
    @Param("id") id: string,
    @Res() res: any
  ): Promise<PreferenceUserDto> {
    const { user } = res.req;
    if (user.roles === AppRoles.ADMIN) {
      return await this.userService
        .getUserPreferences(parseInt(id))
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
    } else {
      return await this.userService
        .getUserPreferences(parseInt(id), user)
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
  }

  //@Delete("/:id")
  @Auth({ action: "delete", possession: "own", resource: AppResource.USER })
  public async deleteUser(@Res() res: any, @Param("id") id: string) {
    const { user } = res.req;
    return await this.userService
      .delete(parseInt(id), user)
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

  @ApiOperation({ summary: "Create Multi Accounts" })
  @Post()
  @Auth({ action: "create", possession: "any", resource: AppResource.USER })
  @UseInterceptors(
    FileInterceptor("file", { dest: join(__dirname, "../account/tarifarios") })
  )
  public async createMultiAcounts(
    @Res() res: any,
    @Body("data") bodyRaw: any,
    @UploadedFile("file") file: Express.Multer.File
  ): Promise<CreateMultiUserDto> {
    const body = await this.userService.validateBody(bodyRaw);
    const response = await this.userService
      .createMultiAcounts(body, file)
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
          data: error.response || error.message,
        });
      });
      return response;
  }

  @ApiOperation({ summary: "Create Corporate Users" })
  @Post("/corporate")
  @Auth({
     action: "create",
     possession: "any", 
     resource: AppResource.USER 
    })
  public async createCorporateUsers(
    @Res() res: any,
    @Body() body: any,
  ): Promise<CreateMultiUserDto> {
    return await this.userService
      .createCorporateUsers(body)
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
          data: error.response || error.message,
        });
      });
  }

  

  @Get("/download/tariff")
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.USER,
  })
  @Header("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
  public async downloadTariff(@Query("accountid") accountId:number, @Res() res: any) {
    return await this.userService.downloadFile(accountId)
    .then(async (result) => {
      return await res.sendFile(result.file, result);
    })
    .catch(async (error) => {
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: false,
        data: returnMessage(error.message),
      });
    });
  }
}
