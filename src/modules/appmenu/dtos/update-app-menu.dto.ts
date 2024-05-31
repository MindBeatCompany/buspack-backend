import { PartialType } from "@nestjs/swagger";
import { CreateAppMenuDto } from "./createAppMenu.dto";

export class UpdateAppMenuDto extends PartialType(CreateAppMenuDto) {}
