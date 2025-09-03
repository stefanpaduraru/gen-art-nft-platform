import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/AbstractEntity';
import { Token } from './Token';

@Entity()
export class Trait extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(() => Token, (token) => token.trait)
  token?: Token;

  @Column()
  rarityScore: number;

  @Column()
  rarityCount: number;

  constructor(
    id: number,
    name: string,
    value: string,
    rarityScore: number = 0,
    rarityCount: number = 0,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.value = value;
    this.rarityScore = rarityScore;
    this.rarityCount = rarityCount;
  }
}
