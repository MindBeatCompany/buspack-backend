import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudOperations } from 'src/shared/interfaces/crud-operations.interface';
import { In, Repository } from 'typeorm';
import { AppmenuEntity } from './entities/appmenu.entity';
import { CreateAppMenuDto } from './dtos';
import { RoleEntity } from '../role/entities/role.entity';

@Injectable()
export class AppmenuService implements CrudOperations {
  constructor(
    @InjectRepository(AppmenuEntity)
    private appmenuRepository: Repository<AppmenuEntity>,
    @InjectRepository(RoleEntity)
    private rolRepository: Repository<RoleEntity>,
  ) {}

  async findAll(role?: string): Promise<AppmenuEntity[]> {
    if (role) {
      const rol = await this.rolRepository.findOne({ name: role });
      const menues = await this.appmenuRepository
        .createQueryBuilder('appmenu')
        .leftJoinAndSelect('appmenu.roles', 'roles', 'roles.id=:idRol', {
          idRol: rol.id,
        })
        .where('roles.id=:idRol', { idRol: rol.id })
        .orderBy('appmenu.id', 'ASC')
        .getMany();
      if (!menues.length)
        throw new NotFoundException('There are no menus for this role');
      return menues;
    } else {
      const menues = await this.appmenuRepository.find({
        relations: ['menuParent', 'roles'],
        order: { id: 'ASC' },
      });

      if (!menues.length)
        throw new NotFoundException('There are no menus for this role');
      return menues;
    }
  }
  findById(id: number): Promise<Object> {
    throw new Error('Method not implemented.');
  }
  findOne(options?: Object, options2?: Object): Promise<Object> {
    throw new Error('Method not implemented.');
  }
  async create(
    menu: CreateAppMenuDto,
    options?: Object,
  ): Promise<AppmenuEntity> {
    const roles = await this.rolRepository.find({
      where: { name: In(menu.roles) },
    });
    const menuParent = await this.appmenuRepository.findOne({
      name: menu.menuParent.toUpperCase(),
    });
    const newMenu = this.appmenuRepository.create({
      name: menu.name,
      menuParent: menuParent,
      url: menu.url,
      roles: roles,
    });
    try {
      await this.appmenuRepository.save(newMenu);
    } catch (error) {
      throw new HttpException(`Error`, HttpStatus.BAD_REQUEST);
    }
    return newMenu;
  }
  update(id: number, newValue: Object): Promise<Object> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
