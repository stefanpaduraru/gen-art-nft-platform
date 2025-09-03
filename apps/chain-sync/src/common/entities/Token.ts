import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/AbstractEntity';
import { Project } from './Project';
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
    default: 0,
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
  project: Project;

  @Column()
  projectId: number;

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
    project: Project,
    projectId: number,
  ) {
    super();
    this.id = id;
    this.token = token;
    this.hash = hash;
    this.owner = owner;
    this.txHash = txHash;
    this.rarityScore = rarityScore;
    this.rendered = rendered;
    this.project = project;
    this.projectId = projectId;
  }
}
