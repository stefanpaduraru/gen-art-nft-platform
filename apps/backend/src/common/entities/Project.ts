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
import { TransferRequest } from './TransferRequest';

export enum ProjectTypes {
  Template = 'template',
  Testnet = 'testnet',
  Mainnet = 'mainnet',
}
export type ProjectType = 'template' | 'testnet' | 'mainnet';

export enum DropTypes {
  Fixed = 'fixed',
  Dutch = 'dutch',
}

export type ProjectSettings = {
  dropType: DropType;
  dropDetails?: string;
  additionalDetails?: string;
  renderDelay: number;
};

export type DropType = 'fixed' | 'dutch';

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
  @JoinColumn()
  token?: Token[];

  @OneToMany(() => Feature, (feature) => feature.project)
  features?: Feature[];

  @OneToMany(
    () => TransferRequest,
    (transferRequest) => transferRequest.project,
  )
  transferRequests?: TransferRequest[];

  @Column()
  templateId?: number;

  @Column()
  chainId?: number;

  @Column({
    type: 'enum',
    default: ProjectTypes.Template,
    enum: ProjectTypes,
  })
  type: ProjectTypes;

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

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  termsAccepted?: boolean;

  @Column({
    type: 'int',
    default: 0,
  })
  votes?: number;

  @Column({
    type: 'int',
    default: 2,
  })
  renderDelay?: number;

  @Column({
    type: 'enum',
    default: DropTypes.Fixed,
    enum: DropTypes,
  })
  dropType?: DropType;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  dropDetails?: string;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  additionalDetails?: string;

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
    type: ProjectTypes,
    featuredTokenId: number = 0,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.type = type;
    this.featuredTokenId = featuredTokenId;
  }

  isCompleted() {
    return !!this.completedAt;
  }

  isDeployed() {
    return (
      this.type === ProjectTypes.Testnet ||
      this.type === ProjectTypes.Mainnet
    );
  }

  isTestnet() {
    return this.type === ProjectTypes.Testnet;
  }

  isMainnet() {
    return this.type === ProjectTypes.Mainnet;
  }

  tokenURL() {
    return '';
  }

  featuredToken(): Token | null {
    return this.token && this.token?.length > 0 && this.token[0]
      ? this.token[0]
      : null;
  }
}

export class ExtendedProject extends Project {
  testnetProject?: Project;
  mainnetProject?: Project;
  constructor(id: number, name: string, type: ProjectTypes) {
    super(id, name, type);
  }
}
