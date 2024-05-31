import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('appmenues')
export class AppmenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  name: string;

  @ManyToOne(() => AppmenuEntity, (menu: AppmenuEntity) => menu.id)
  menuParent: AppmenuEntity;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  url: string;

  @ManyToMany(() => RoleEntity, (role: RoleEntity) => role)
  @JoinTable()
  roles: RoleEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  setUpperCase() {
    this.name = this.name.toUpperCase();
  }
}
