import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRolesBuilder, RolesBuilder } from "nest-access-control";
import { AppResource } from "src/shared/config/app.roles";
import Auth from "src/shared/decorators/auth.decorator";
import { AppmenuService } from "./appmenu.service";
import { CreateAppMenuDto } from "./dtos";
import { AppmenuEntity } from "./entities/appmenu.entity";
//@ApiTags("Menues")
@Controller("appmenu")
export class AppmenuController {
  constructor(
    private readonly appmenuService: AppmenuService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder
  ) {}

  /* @Auth({ possession: 'any', action: 'create', resource: AppResource.MENU })
  @Post()
  public async createMenu(
    @Res() res: any,
    @Body() body: CreateAppMenuDto,
  ): Promise<AppmenuEntity> {
    return await this.appmenuService.create(body).then(async (result) => {
      return await res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        success: true,
        data: result,
      });
    });
  }

  @Auth({ possession: 'own', action: 'read', resource: AppResource.MENU })
  @Get()
  public async getAllMenu(@Res() res: any): Promise<AppmenuEntity> {
    const { user } = res.req;
    let result: any;
    if (this.rolesBuilder.can(user.roles).readAny(AppResource.MENU).granted) {
      result = await this.appmenuService.findAll();
    } else {
      result = await this.appmenuService.findAll(user.roles);
    }
    return await res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      success: true,
      data: result,
    });
  } */
}
