import { AppmenuEntity } from 'src/modules/appmenu/entities/appmenu.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @OneToMany(() => UserEntity, (users: UserEntity) => users.role)
  users: UserEntity[];
  @ManyToMany(() => AppmenuEntity, (appmenu: AppmenuEntity) => appmenu.roles)
  appmenues: AppmenuEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  setUpperCase() {
    this.name = this.name.toUpperCase();
  }
}
