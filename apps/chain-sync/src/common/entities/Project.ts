import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/AbstractEntity';
import { transformIntToNullBool } from '@common/utils/transformers';
import { Token } from './Token';
import { Collection } from './Collection';
import { Contract } from './Contract';
import { User } from './User';
import { Feature } from './Feature';

export enum ProjectType {
  Template = 'template',
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}

@Entity()
export class Project extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.project)
  user?: User;

  @ManyToOne(() => Contract, (contract) => contract.project)
  contract?: Contract;

  @ManyToOne(() => Collection, (collection) => collection.project)
  collection?: Collection;

  @OneToMany(() => Token, (token) => token.project)
  token?: Token[];

  @OneToMany(() => Feature, (feature) => feature.project)
  @JoinColumn()
  feature?: Feature[];

  @Column()
  templateId?: number;

  @Column()
  chainId?: number;

  @Column({
    type: 'enum',
    default: ProjectType.Template,
    enum: ProjectType,
  })
  type: ProjectType;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  artist?: string;

  @Column()
  website?: string;

  @Column()
  license?: string;

  @Column()
  featuredTokenId: number;

  @Column({
    type: 'blob',
  })
  script?: string;

  @Column()
  pricePerTokenInWei?: string;

  @Column()
  iterations?: number;

  @Column()
  maxIterations?: number;

  @Column()
  maxTokensPerAddress?: number;

  @Column()
  startingAt?: Date;

  @Column()
  completedAt?: Date;

  @Column({
    type: 'varchar',
    length: 70,
  })
  collaboratorAddress?: string;

  @Column()
  collaboratorPercentage?: number;

  @Column()
  royaltyFeePercentage?: number;

  @Column()
  feePercentage?: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  metadata?: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  useStorage?: boolean;

  @Column({
    type: 'varchar',
    length: 70,
  })
  baseURI?: string;

  @Column({
    type: 'varchar',
    length: 70,
  })
  baseIpfsURI?: string;

  @Column()
  renderDelay: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  active?: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  paused?: boolean;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  locked?: boolean;

  constructor(
    id: number,
    name: string,
    type: ProjectType,
    featuredTokenId: number = 0,
    renderDelay: number = 20,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.type = type;
    this.featuredTokenId = featuredTokenId;
    this.renderDelay = renderDelay;
  }

  isCompleted() {
    return !!this.completedAt;
  }

  isDeployed() {
    return false;
    //return !!this.mainnetId || !!this.testnetId;
  }

  isTestnet() {
    return false;
    // return !!this.testnetId && !this.mainnetId;
  }

  isMainnet() {
    return false;
    // return !!this.mainnetId;
  }

  tokenURL() {
    return '';
  }
}

export class ExtendedProject extends Project {
  testnetProject?: Project;
  mainnetProject?: Project;
  constructor(id: number, name: string, type: ProjectType) {
    super(id, name, type);
  }
}
