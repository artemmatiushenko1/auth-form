import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

const SALT_OR_ROUNDS = 10;

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  group: string;

  @Column({ nullable: true })
  variant: number;

  @Column()
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, SALT_OR_ROUNDS);
    }
  }
}
