import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotAcceptableException,
  Param,
  Post,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AppResource } from "src/shared/config/app.roles";
import Auth from "src/shared/decorators/auth.decorator";
import returnMessage from "src/shared/return-messages";
import { RoleCreatedDto, CreateRolDto } from "./dtos";
import { RoleEntity } from "./entities/role.entity";
import { RoleService } from "./role.service";
@ApiTags("Roles")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: "Get all roles" })
  @Get()
  @Auth({ possession: "own", action: "read", resource: AppResource.ROLE })
  public async getAllRoles(@Res() res: any): Promise<RoleCreatedDto[]> {
    const { user } = res.req;
    return await this.roleService
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
          success: true,
          data: returnMessage(error.message),
        });
      });
  }
  @ApiOperation({ summary: "Get One role" })
  @Get("/:id")
  @Auth({ possession: "own", action: "read", resource: AppResource.ROLE })
  public async getOneRole(
    @Res() res: any,
    @Param("id") id: string
  ): Promise<RoleCreatedDto> {
    return await this.roleService
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
          success: true,
          data: returnMessage(error.message),
        });
      });
  }
  @ApiOperation({ summary: "Create One role" })
  @Post()
  @Auth({ possession: "any", action: "create", resource: AppResource.ROLE })
  public async createRole(
    @Res() res: any,
    @Body() body: CreateRolDto
  ): Promise<RoleEntity> {
    return await this.roleService
      .create(body)
      .then(async (result) => {
        return await res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result,
        });
      })
      .catch((error) => {
        console.log(error.message);
        throw new NotAcceptableException(error.message);
      });
  }
}
