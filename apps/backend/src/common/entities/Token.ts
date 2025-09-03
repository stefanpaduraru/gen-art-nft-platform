import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/AbstractEntity';
import { ExtendedProject, Project } from './Project';
import { Trait } from './Trait';
import { transformIntToNullBool } from '@common/utils/transformers';
@Entity()
export class Token extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  token: number;

  @Column()
  owner: string;

  @Column()
  txHash: string;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
    transformer: transformIntToNullBool,
  })
  isTestnet?: boolean;

  @Column()
  rarityScore: number;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 0,
    transformer: transformIntToNullBool,
  })
  rendered?: boolean;

  @ManyToOne(() => Project, (project) => project.token)
  @JoinColumn()
  project?: Project;

  @Column()
  projectId?: number;

  @OneToMany(() => Trait, (trait) => trait.token)
  trait?: Trait[];

  constructor(
    id: number,
    token: number,
    hash: string,
    owner: string,
    txHash: string,
    rarityScore: number = 0,
    rendered: boolean = false,
  ) {
    super();
    this.id = id;
    this.token = token;
    this.hash = hash;
    this.owner = owner;
    this.txHash = txHash;
    this.rarityScore = rarityScore;
    this.rendered = rendered;
  }
}

export type TokenWithProject = Token & { project: ExtendedProject };
export type TokenWithProjectAndRarity = Token & {
  project: ExtendedProject;
  rarityRank: number;
};
