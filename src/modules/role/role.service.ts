import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AppRoles } from "src/shared/config/app.roles";
import messages from "src/shared/config/strings-constants";
import { CrudOperations } from "src/shared/interfaces/crud-operations.interface";
import returnMessage from "src/shared/return-messages";
import { Repository } from "typeorm";
import { UserLoggedDto } from "../auth/dtos";
import { CreateRolDto } from "./dtos/create-rol.dto";
import { UdpdateRolDto } from "./dtos/udpdate-rol.dto";
import { RoleEntity } from "./entities/role.entity";

@Injectable()
export class RoleService implements CrudOperations {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}
  async findAll(user: UserLoggedDto): Promise<RoleEntity[]> {
    if (user.roles === AppRoles.ADMIN) {
      const roles = await this.roleRepository.find();
      if (!roles.length) throw new Error(messages.notFoundRoles);
      return roles;
    } else {
      const roles = await this.roleRepository.find({
        where: `name != "${AppRoles.ADMIN}"`,
      });
      if (!roles.length) throw new Error(messages.notFoundRoles);
      return roles;
    }
  }
  findById(id: number): Promise<RoleEntity> {
    throw new Error("Method not implemented.");
  }
  async findOne(options?: Object, options2?: Object): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne(options);
    if (!role) throw new Error(messages.rolNotExist);
    return role;
  }
  async create(entity: CreateRolDto, options?: Object): Promise<RoleEntity> {
    const role = await this.roleRepository.findOne(entity);
    if (role) throw new Error(messages.rolExist);
    const newRol = this.roleRepository.create(entity);
    return await this.roleRepository.save(newRol);
  }
  async update(id: number, newValue: UdpdateRolDto): Promise<RoleEntity> {
    const role = await this.findOne({ id });
    if (!role) throw new Error(messages.rolNotExist);
    const roleUpdated = Object.assign(role, newValue);
    return await this.roleRepository.save(roleUpdated);
  }
  async delete(id: number): Promise<Object> {
    const role = await this.roleRepository.findOne({ id });
    if (!role) return returnMessage(messages.rolNotExist);
    return await this.roleRepository.remove(role);
  }
}
