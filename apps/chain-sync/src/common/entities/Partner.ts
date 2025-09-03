import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/AbstractEntity';
import { User } from './User';
import { Contract } from './Contract';
import { transformIntToNullBool } from '@common/utils/transformers';

@Entity()
export class Partner extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.partner)
  @JoinColumn()
  users?: User[];

  @OneToMany(() => Contract, (contract) => contract.partner)
  contract?: Contract[];

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  active?: boolean;

  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
}
