import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/AbstractEntity';
import { Partner } from './Partner';
import { Project } from './Project';
import { transformIntToNullBool } from '@common/utils/transformers';

export enum Roles {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  PARTNER = 'PARTNER',
}

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Partner, (partner) => partner.users)
  partner?: Partner;

  @OneToMany(() => Project, (project) => project.user)
  project?: Project;

  @Column()
  email?: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  testnetAddress?: string;

  @Column()
  bio?: string;

  @Column()
  twitterHandle?: string;

  @Column()
  instagramHandle?: string;

  @Column()
  discordHandle?: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  blocked?: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  isAdmin?: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  isOperator?: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  isMintoriaStaff?: boolean;

  constructor(id: number, name: string, address: string) {
    super();
    this.id = id;
    this.name = name;
    this.address = address;
  }
}
