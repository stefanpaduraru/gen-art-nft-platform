import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { AbstractEntity } from '@common/entities/AbstractEntity';
import { Project } from './Project';

@Entity()
export class Feature extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Project, (project) => project.features)
  project?: Project;

  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
}
