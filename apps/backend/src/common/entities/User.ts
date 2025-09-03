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
import { RolesValidator } from '@common/validators/RolesValidator';
import { Validate } from 'class-validator';
import { Token } from './Token';

export enum Roles {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  ADMIN_PARTNER = 'ADMIN_PARTNER',
  OPERATOR_PARTNER = 'ADMIN_OPERATOR',
}

export type Artist = User & {
  featuredToken?: Token | null;
  projectCount?: number;
};
@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Partner, (partner) => partner.users)
  partner?: Partner;

  @OneToMany(() => Project, (project) => project.user)
  project?: Project[];

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

  @Validate(RolesValidator)
  @Column({
    type: 'simple-json',
    nullable: true,
  })
  roles?: Roles[];

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

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  active?: boolean;

  constructor(id: number, name: string, address: string) {
    super();
    this.id = id;
    this.name = name;
    this.address = address;
  }
}
