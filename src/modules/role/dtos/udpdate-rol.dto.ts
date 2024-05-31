import { PartialType } from '@nestjs/swagger';
import { CreateRolDto } from './create-rol.dto';

export class UdpdateRolDto extends PartialType(CreateRolDto) {}
