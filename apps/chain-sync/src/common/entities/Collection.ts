import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { AbstractEntity } from "@common/entities/AbstractEntity";
import { Partner } from "./Partner";
import { Project } from "./Project";

@Entity()
export class Collection extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Partner, (partner) => partner.contract)
  partner?: Partner;

  @OneToMany(() => Project, (project) => project.collection)
  project?: Project[];

  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }
}
