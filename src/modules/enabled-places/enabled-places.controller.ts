import { Controller, Get, Res, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AppResource } from "src/shared/config/app.roles";
import Auth from "src/shared/decorators/auth.decorator";
import returnMessage from "src/shared/return-messages";
import { AssociatedZipcodeService } from "./associated-zipcode.service";
import { EnabledPlacesService } from "./enabled-places.service";

@Controller("enabled-places")
export class EnabledPlacesController {
  constructor(
    private readonly enabledPlacesService: EnabledPlacesService,
    private readonly associatedZipCodeSevice: AssociatedZipcodeService
  ) {}

  @ApiOperation({ summary: "Get locality" })
  @Get("locality")
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.ENABLED_PLACES,
  })
  async getLocalityByAssociatedZipCode(
    @Query("enabled_place") enabledPlace: string,
    @Res() res: any
  ): Promise<void> {
    return this.associatedZipCodeSevice
      .getLocality(enabledPlace)
      .then((data) => {
        res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: data,
        });
      })
      .catch((error) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: returnMessage(error.message),
        });
      });
  }

  @ApiOperation({ summary: "Get enabled places" })
  @Get()
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.ENABLED_PLACES,
  })
  async getEnabledPlacesLocal(@Res() res: any): Promise<void> {
    return this.associatedZipCodeSevice
      .getEnabledPlacesLocal(["enabled_place", "locality_name","province_name","zip_code"])
      .then((result) => {
        res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: returnMessage(error.message),
        });
      });
  }

  @ApiOperation({ summary: "Get enabled places from SAIT" })
  @Get("/sait")
  @Auth({
    action: "read",
    possession: "own",
    resource: AppResource.ENABLED_PLACES,
  })
  async getEnabledPlacesSait(@Res() res: any): Promise<void> {
    return this.enabledPlacesService
      .getEnabledPlacesSait()
      .then(() => {
        res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          success: true,
          data: true,
        });
      })
      .catch((error) => {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          data: returnMessage(error.message),
        });
      });
  }
}
