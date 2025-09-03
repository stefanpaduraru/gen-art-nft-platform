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
  testnetAddress?: string;

  @Column()
  slug: string;

  @Column()
  awsBucket?: string;

  @Column()
  mediaURL?: string;

  @Column()
  minterContractId?: number;

  @Column({
    type: 'enum',
    default: ContractType.Core,
    enum: ContractType,
  })
  type: ContractType;

  @ManyToOne(() => Partner, (partner) => partner.contract)
  partner?: Partner;

  @OneToMany(() => Project, (project) => project.contract)
  project?: Project[];

  constructor(
    id: number,
    name: string,
    address: string,
    type: ContractType,
    slug: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.mainnetAddress = address;
    this.type = type;
    this.slug = slug;
  }
}
