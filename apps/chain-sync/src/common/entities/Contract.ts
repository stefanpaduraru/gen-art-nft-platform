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

export enum ContractType {
  Core = 'core',
  Main = 'main',
  Randomizer = 'randomizer',
}

@Entity()
export class Contract extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  mainnetAddress: string;

  @Column()
  testnetAddress: string;

  @Column({
    type: 'enum',
    default: ContractType.Core,
    enum: ContractType,
  })
  type: ContractType;

  @Column()
  slug: string;

  @ManyToOne(() => Partner, (partner) => partner.contract)
  partner?: Partner;

  @OneToMany(() => Project, (project) => project.contract)
  project?: Project[];

  constructor(
    id: number,
    name: string,
    address: string,
    type: ContractType,
    testnetAddress: string,
    slug: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.mainnetAddress = address;
    this.type = type;
    this.testnetAddress = testnetAddress;
    this.slug = slug;
  }
}
