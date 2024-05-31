import { hash } from "bcrypt";
import { AccountEntity } from "../../account/entities/account.entity";
import { RoleEntity } from "src/modules/role/entities/role.entity";

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Console } from "console";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_name", type: "varchar", length: 255 })
  userName: string;
  @Column({ name: "name", type: "varchar", length: 255 })
  firstName: string;
  @Column({ name: "last_name", type: "varchar", length: 255 })
  lastName: string;
  @Column({ type: "varchar", length: 255, nullable: false })
  email: string;
  @Column({ type: "varchar", length: 128, nullable: false, select: false })
  password: string;
  @Column({ type: "bool", default: true })
  isActive: boolean;
  @Column({
    name: "first_time_logged",
    type: "bool",
    default: true,
    select: false,
  })
  firstTimeLogged: boolean;

  @Column({
    name: "wrong_session_counter",
    type: "smallint",
    default: 4,
    select: false,
  })
  wrongSessionCounter: number;

  @Column({ name: "session_time", type: "smallint", default: 10 })
  sessionTime: number;

  @ManyToOne(() => RoleEntity, (role: RoleEntity) => role.id)
  role: RoleEntity;

  @ManyToOne(() => AccountEntity, (account: AccountEntity) => account.users)
  account: AccountEntity;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp" })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    console.log("JOJOJOJOJOJOJOJOJOJO")
    if (!this.password) { 
      return;
    }
    this.password = await hash(this.password, 12);
  }
}
