import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppResource } from "src/shared/config/app.roles";
import Auth from "src/shared/decorators/auth.decorator";
import returnMessage from "src/shared/return-messages";
import { UserEntity } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";
import {
  AccountRecoveryDto,
  LoginDto,
  RegisterDto,
  UpdatePasswordDto,
  UserLoggedDto,
} from "./dtos";
import { LocalAuthGuard } from "./guards";
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login User" })
  @Post("login")
 // @UseGuards(LocalAuthGuard)
  public async login(
    @Body() body: LoginDto,
    @Res() res: any
  ): Promise<UserLoggedDto> {
    return await this.authService
      .validateUser(body)
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

  public async register(
    @Body() body: RegisterDto,
    @Res() res: any
  ): Promise<UserEntity> {
    return await this.authService
      .newUser(body)
      .then(async (result) => {
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result,
        });
      })
      .catch(async (error) => {
        return await res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: error.status,
          success: false,
          data: error.message,
        });
      });
  }

  @ApiOperation({ summary: "Update user's own password" })
  @Post("updatepass")
  @Auth({
    possession: "own",
    action: "update",
    resource: AppResource.USER,
  })
  public async updatePass(
    @Res() res: any,
    @Body() body: UpdatePasswordDto
  ): Promise<UserLoggedDto> {
    const { user } = res.req;
    return await this.authService
      .changePass(body, user)
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

  @ApiOperation({ summary: "Password recovery" })
  @Post("recovery")
  public async accountRecovery(
    @Res() res: any,
    @Body() body: AccountRecoveryDto
  ) {
    return await this.authService.recovery(body).then(async (result) => {
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: result,
      });
    });
  }
}
