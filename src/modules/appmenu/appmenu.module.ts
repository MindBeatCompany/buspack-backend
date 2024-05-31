import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../role/entities/role.entity';
import { AppmenuController } from './appmenu.controller';
import { AppmenuService } from './appmenu.service';
import { AppmenuEntity } from './entities/appmenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppmenuEntity, RoleEntity])],
  controllers: [AppmenuController],
  providers: [AppmenuService],
})
export class AppmenuModule {}
